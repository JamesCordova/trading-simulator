#!/usr/bin/env node

/**
 * K6 HTML Report Generator
 * Generates HTML report from K6 JSON output using native Node.js
 */

const fs = require('fs');
const path = require('path');

// Get command line arguments
const jsonFile = process.argv[2];
const outputPath = process.argv[3]; // Can be directory or file path

if (!jsonFile || !outputPath) {
  console.error('❌ Usage: node generate-k6-report.js <input.json> <output-dir-or-file>');
  process.exit(1);
}

// Verify input file exists
if (!fs.existsSync(jsonFile)) {
  console.error(`❌ Input file not found: ${jsonFile}`);
  process.exit(1);
}

// Determine output file path
const outputFile = outputPath.endsWith('.html') ? outputPath : path.join(outputPath, 'index.html');
const outputDir = path.dirname(outputFile);

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('📊 K6 HTML Report Generator');
console.log(`📁 Input: ${jsonFile}`);
console.log(`📄 Output: ${outputFile}`);

try {
  console.log('🔧 Generating HTML report from JSON...');
  
  // Read the JSON summary file
  const summaryData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  
  // Extract metrics
  const metrics = summaryData.metrics || {};
  
  // Helper function to format duration
  const formatDuration = (ms) => {
    if (!ms || ms === 0) return 'N/A';
    if (ms < 1) return `${(ms * 1000).toFixed(2)}µs`;
    if (ms < 1000) return `${ms.toFixed(2)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };
  
  // Helper function to format bytes
  const formatBytes = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
  };
  
  // Helper function to format percentage
  const formatPercent = (value) => {
    if (typeof value !== 'number') return 'N/A';
    return `${(value * 100).toFixed(2)}%`;
  };
  
  // Helper function to format thresholds
  const formatThresholds = (thresholds) => {
    if (!thresholds || typeof thresholds !== 'object') return 'N/A';
    
    const formatted = Object.entries(thresholds).map(([condition, passed]) => {
      const icon = passed ? '✅' : '❌';
      const status = passed ? 'Pass' : 'Fail';
      return `${icon} ${condition} (${status})`;
    }).join('<br>');
    
    return formatted || 'N/A';
  };
  
  // Generate timing rows
  const timingRows = [
    ['http_req_duration', 'Total Duration'],
    ['http_req_waiting', 'Waiting (TTFB)'],
    ['http_req_receiving', 'Receiving'],
    ['http_req_sending', 'Sending'],
    ['http_req_blocked', 'Blocked'],
    ['http_req_connecting', 'Connecting'],
    ['http_req_tls_handshaking', 'TLS Handshaking']
  ].map(([key, label]) => {
    const m = metrics[key];
    if (!m) return '';
    return `
                    <tr>
                        <td><strong>${label}</strong></td>
                        <td>${formatDuration(m.avg)}</td>
                        <td>${formatDuration(m.min)}</td>
                        <td>${formatDuration(m.med)}</td>
                        <td>${formatDuration(m.max)}</td>
                        <td>${formatDuration(m['p(90)'])}</td>
                        <td>${formatDuration(m['p(95)'])}</td>
                    </tr>`;
  }).join('');
  
  // Generate HTML report
  const htmlReport = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>K6 Performance Test Report</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 40px 20px;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        .header {
            text-align: center;
            color: white;
            margin-bottom: 40px;
        }
        .header h1 { font-size: 2.5rem; margin-bottom: 10px; }
        .card {
            background: white;
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .metric-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .metric-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 25px;
            border-radius: 10px;
            text-align: center;
        }
        .metric-value {
            font-size: 2rem;
            font-weight: bold;
            margin: 10px 0;
        }
        .metric-label {
            font-size: 0.9rem;
            opacity: 0.9;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .metric-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        .metric-table th {
            background: #f7fafc;
            padding: 12px;
            text-align: left;
            font-weight: 600;
            border-bottom: 2px solid #e2e8f0;
        }
        .metric-table td {
            padding: 12px;
            border-bottom: 1px solid #e2e8f0;
        }
        .metric-table tr:hover {
            background: #f7fafc;
        }
        .status-badge {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: 600;
            margin-top: 10px;
        }
        .status-success { background: #48bb78; color: white; }
        .status-warning { background: #ed8936; color: white; }
        .back-link {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 24px;
            background: white;
            color: #2d3748;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: transform 0.2s;
        }
        .back-link:hover { transform: scale(1.05); }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 K6 Performance Test Report</h1>
            <p>Load Testing Results - ${new Date().toLocaleString()}</p>
        </div>

        <div class="card">
            <h2>📊 Key Metrics</h2>
            <div class="metric-grid">
                <div class="metric-card">
                    <div class="metric-label">HTTP Requests</div>
                    <div class="metric-value">${metrics.http_reqs?.count || 0}</div>
                    <div style="font-size: 0.85rem; opacity: 0.8; margin-top: 5px;">${metrics.http_reqs?.rate?.toFixed(2) || 0} req/s</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Request Duration (avg)</div>
                    <div class="metric-value">${formatDuration(metrics.http_req_duration?.avg)}</div>
                    <div style="font-size: 0.85rem; opacity: 0.8; margin-top: 5px;">p95: ${formatDuration(metrics.http_req_duration?.['p(95)'])}</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Failed Requests</div>
                    <div class="metric-value">${formatPercent(metrics.http_req_failed?.value || 0)}</div>
                    <div style="font-size: 0.85rem; opacity: 0.8; margin-top: 5px;">${metrics.http_req_failed?.fails || 0} fails / ${(metrics.http_req_failed?.passes + metrics.http_req_failed?.fails) || 0} total</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Data Transferred</div>
                    <div class="metric-value">${formatBytes(metrics.data_received?.count)}</div>
                    <div style="font-size: 0.85rem; opacity: 0.8; margin-top: 5px;">↓ ${formatBytes(metrics.data_received?.rate)}/s</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Virtual Users</div>
                    <div class="metric-value">${metrics.vus?.value || 0} / ${metrics.vus_max?.value || 0}</div>
                    <div style="font-size: 0.85rem; opacity: 0.8; margin-top: 5px;">Current / Max</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Iterations</div>
                    <div class="metric-value">${metrics.iterations?.count || 0}</div>
                    <div style="font-size: 0.85rem; opacity: 0.8; margin-top: 5px;">${metrics.iterations?.rate?.toFixed(2) || 0} iter/s</div>
                </div>
            </div>
        </div>

        <div class="card">
            <h2>📈 HTTP Request Timings</h2>
            <table class="metric-table">
                <thead>
                    <tr>
                        <th>Phase</th>
                        <th>Avg</th>
                        <th>Min</th>
                        <th>Med</th>
                        <th>Max</th>
                        <th>p(90)</th>
                        <th>p(95)</th>
                    </tr>
                </thead>
                <tbody>
                    ${timingRows}
                </tbody>
            </table>
        </div>

        <div class="card">
            <h2>✅ Checks & Thresholds</h2>
            <table class="metric-table">
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Status</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Checks</strong></td>
                        <td><span class="status-badge ${metrics.checks?.value >= 0.95 ? 'status-success' : 'status-warning'}">${formatPercent(metrics.checks?.value)}</span></td>
                        <td>${metrics.checks?.passes || 0} passes / ${metrics.checks?.fails || 0} fails</td>
                    </tr>
                    <tr>
                        <td><strong>HTTP Request Failed</strong></td>
                        <td><span class="status-badge ${(metrics.http_req_failed?.value || 0) < 0.1 ? 'status-success' : 'status-warning'}">${formatPercent(metrics.http_req_failed?.value)}</span></td>
                        <td>${formatThresholds(metrics.http_req_failed?.thresholds)}</td>
                    </tr>
                    ${metrics.http_req_duration?.thresholds ? `
                    <tr>
                        <td><strong>Request Duration</strong></td>
                        <td><span class="status-badge status-success">p(95): ${formatDuration(metrics.http_req_duration?.['p(95)'])}</span></td>
                        <td>${formatThresholds(metrics.http_req_duration.thresholds)}</td>
                    </tr>` : ''}
                </tbody>
            </table>
        </div>

        <div class="card">
            <h2>ℹ️ Test Information</h2>
            <p><strong>Test Duration:</strong> ${formatDuration(metrics.iteration_duration?.avg)}</p>
            <p style="margin-top: 10px;"><strong>Groups:</strong> ${Object.keys(summaryData.root_group?.groups || {}).length} test groups</p>
            <div class="status-badge status-success">Test Completed</div>
        </div>

        <div style="text-align: center;">
            <a href="../" class="back-link">← Back to Reports Hub</a>
            <a href="results.json" download class="back-link" style="margin-left: 10px;">📥 Download JSON</a>
        </div>
    </div>
</body>
</html>`;
  
  // Write the HTML report to file
  fs.writeFileSync(outputFile, htmlReport);
  
  // Verify output was created
  if (fs.existsSync(outputFile)) {
    const stats = fs.statSync(outputFile);
    console.log(`✅ Report generated successfully at: ${outputFile}`);
    console.log(`📊 File size: ${(stats.size / 1024).toFixed(2)} KB`);
    process.exit(0);
  } else {
    console.error('❌ Failed to create report file');
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ Error generating report:');
  console.error('Error message:', error.message);
  console.error('Error stack:', error.stack);
  process.exit(1);
}
