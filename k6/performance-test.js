import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const pageLoadTime = new Trend('page_load_time');

// Test configuration
export let options = {
  stages: [
    { duration: '30s', target: 20 },  // Ramp-up to 20 users
    { duration: '1m', target: 20 },   // Stay at 20 users
    { duration: '30s', target: 50 },  // Spike to 50 users
    { duration: '1m', target: 50 },   // Stay at 50 users
    { duration: '30s', target: 0 },   // Ramp-down to 0
  ],
  thresholds: {
    'http_req_duration': ['p(95)<2000'], // 95% of requests should be below 2s
    'http_req_failed': ['rate<0.05'],    // Error rate should be less than 5% (más estricto)
    'http_reqs': ['rate>10'],            // At least 10 requests per second
    'checks': ['rate>0.95'],             // 95% of checks should pass
  },
};

const BASE_URL = 'https://trading-simulator-beryl.vercel.app';

export default function () {
  // Test 1: Landing Page
  group('Landing Page', function () {
    const res = http.get(BASE_URL);
    
    const checkRes = check(res, {
      'Landing page - status is 200': (r) => r.status === 200,
      'Landing page - loads in < 2s': (r) => r.timings.duration < 2000,
      'Landing page - has content': (r) => r.body.length > 1000,
      'Landing page - has HTML structure': (r) => r.body.includes('<html') && r.body.includes('</html>'),
    });
    
    errorRate.add(!checkRes);
    pageLoadTime.add(res.timings.duration);
    
    sleep(1);
  });

  // Test 2: Dashboard Page
  group('Dashboard Page', function () {
    const res = http.get(`${BASE_URL}/dashboard`);
    
    const checkRes = check(res, {
      'Dashboard - status is 200 or 307 (redirect)': (r) => r.status === 200 || r.status === 307 || r.status === 302,
      'Dashboard - loads in < 3s': (r) => r.timings.duration < 3000,
      'Dashboard - response exists': (r) => r.body.length > 100,
      'Dashboard - valid HTTP response': (r) => r.status >= 200 && r.status < 500,
    });
    
    errorRate.add(!checkRes);
    pageLoadTime.add(res.timings.duration);
    
    sleep(1);
  });

  // Test 3: Static Assets
  group('Static Assets', function () {
    const responses = http.batch([
      ['GET', `${BASE_URL}/favicon.ico`, null, { tags: { name: 'Favicon' } }],
      ['GET', `${BASE_URL}/next.svg`, null, { tags: { name: 'NextSVG' } }],
      ['GET', `${BASE_URL}/vercel.svg`, null, { tags: { name: 'VercelSVG' } }],
    ]);
    
    responses.forEach((res, index) => {
      const assetName = ['favicon.ico', 'next.svg', 'vercel.svg'][index];
      check(res, {
        [`${assetName} - loaded successfully`]: (r) => r.status === 200 || r.status === 304,
        [`${assetName} - has content`]: (r) => r.body.length > 0,
        [`${assetName} - loads quickly`]: (r) => r.timings.duration < 1000,
      });
    });
    
    sleep(0.5);
  });

  // Test 4: Stress test - Multiple page loads
  group('Multiple Page Navigation', function () {
    const pages = ['/', '/dashboard'];
    
    pages.forEach((page) => {
      const res = http.get(`${BASE_URL}${page}`);
      check(res, {
        [`${page} - loaded successfully`]: (r) => r.status === 200 || r.status === 307 || r.status === 302,
        [`${page} - acceptable response time`]: (r) => r.timings.duration < 5000,
        [`${page} - has response body`]: (r) => r.body.length > 0,
      });
      sleep(0.5);
    });
  });

  sleep(1);
}

// handleSummary is called at the end of the test to generate a summary JSON
// This is required for k6-html-reporter to work correctly
export function handleSummary(data) {
  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
  };
}

function textSummary(data, options) {
  const indent = options.indent || '';
  
  return `
${indent}✅ K6 Test Summary
${indent}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${indent}Duration: ${data.state.testRunDurationMs}ms
${indent}Iterations: ${data.metrics.iterations.values.count}
${indent}VUs: ${data.metrics.vus.values.value}
${indent}HTTP Requests: ${data.metrics.http_reqs.values.count}
${indent}Failed Requests: ${data.metrics.http_req_failed.values.passes || 0}
${indent}Avg Response Time: ${data.metrics.http_req_duration.values.avg.toFixed(2)}ms
${indent}p95 Response Time: ${data.metrics.http_req_duration.values['p(95)'].toFixed(2)}ms
  `;
}