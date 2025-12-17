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
    'http_req_failed': ['rate<0.1'],     // Error rate should be less than 10%
    'errors': ['rate<0.1'],              // Custom error rate
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
      'Landing page - has content': (r) => r.body.includes('Trading Simulator') || r.body.length > 0,
    });
    
    errorRate.add(!checkRes);
    pageLoadTime.add(res.timings.duration);
    
    sleep(1);
  });

  // Test 2: Dashboard Page
  group('Dashboard Page', function () {
    const res = http.get(`${BASE_URL}/dashboard`);
    
    const checkRes = check(res, {
      'Dashboard - status is 200 or 307 (redirect)': (r) => r.status === 200 || r.status === 307,
      'Dashboard - loads in < 3s': (r) => r.timings.duration < 3000,
      'Dashboard - response exists': (r) => r.body.length > 0,
    });
    
    errorRate.add(!checkRes);
    pageLoadTime.add(res.timings.duration);
    
    sleep(1);
  });

  // Test 3: Static Assets
  group('Static Assets', function () {
    const responses = http.batch([
      ['GET', `${BASE_URL}/_next/static/css/app/layout.css`, null, { tags: { name: 'CSS' } }],
      ['GET', `${BASE_URL}/favicon.ico`, null, { tags: { name: 'Favicon' } }],
    ]);
    
    responses.forEach((res) => {
      check(res, {
        'Static asset loaded': (r) => r.status === 200 || r.status === 304,
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
        [`${page} - loaded successfully`]: (r) => r.status === 200 || r.status === 307,
      });
      sleep(0.5);
    });
  });

  sleep(1);
}

export function handleSummary(data) {
  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
  };
}

function textSummary(data, options) {
  const indent = options.indent || '';
  const enableColors = options.enableColors || false;
  
  return `
${indent}Execution Summary:
${indent}  scenarios: ${data.root_group.checks.passes + data.root_group.checks.fails} checks
${indent}  http_reqs: ${data.metrics.http_reqs.values.count}
${indent}  http_req_duration: avg=${data.metrics.http_req_duration.values.avg.toFixed(2)}ms
${indent}  checks: ${data.root_group.checks.passes} passed, ${data.root_group.checks.fails} failed
  `;
}