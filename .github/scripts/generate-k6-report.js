#!/usr/bin/env node

/**
 * K6 HTML Report Generator
 * Generates HTML report from K6 JSON output using k6-reporter
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
console.log(`� Output: ${outputFile}`);

try {
  console.log('🔧 Generating HTML report from JSON...');
  
  // Read the JSON summary file
  const summaryData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  
  // Extract metrics
  const metrics = summaryData.metrics || {};
  
  // Helper function to format metric value
  const formatMetric = (metric) => {
    if (!metric) return 'N/A';
    const value = metric.values?.avg || metric.values?.rate || metric.values?.count || metric.value || 0;
    return typeof value === 'number' ? value.toFixed(2) : value;
  };
  
  // Helper function to format duration
  const formatDuration = (ms) => {
    if (ms < 1000) return `${ms.toFixed(2)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };
  
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
                    <div class="metric-value">${formatMetric(metrics.http_reqs)}</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Request Duration (avg)</div>
                    <div class="metric-value">${formatDuration(parseFloat(formatMetric(metrics.http_req_duration)))}</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Failed Requests</div>
                    <div class="metric-value">${formatMetric(metrics.http_req_failed)}</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Data Received</div>
                    <div class="metric-value">${(parseFloat(formatMetric(metrics.data_received)) / 1024 / 1024).toFixed(2)} MB</div>
                </div>
            </div>
        </div>

        <div class="card">
            <h2>📈 Detailed Metrics</h2>
            <table class="metric-table">
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Value</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(metrics).map(([name, data]) => `
                    <tr>
                        <td><strong>${name}</strong></td>
                        <td>${formatMetric(data)}</td>
                        <td>${data.type || 'N/A'}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div class="card">
            <h2>ℹ️ Test Information</h2>
            <p><strong>Root Group Duration:</strong> ${summaryData.root_group?.path ? summaryData.root_group.path : 'N/A'}</p>
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
