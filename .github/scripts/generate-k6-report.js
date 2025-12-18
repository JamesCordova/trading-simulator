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
  
  // Helper function to get status color
  const getStatusColor = (value, threshold, inverse = false) => {
    if (typeof value !== 'number') return '#718096';
    const isGood = inverse ? value > threshold : value < threshold;
    return isGood ? '#48bb78' : '#f56565';
  };
  
  // Helper function to calculate error rate properly
  const calculateErrorRate = (metric) => {
    if (!metric) return { rate: 0, failed: 0, total: 0 };
    // In K6, http_req_failed metric: passes = failed requests, fails = successful requests
    const failed = metric.passes || 0;
    const succeeded = metric.fails || 0;
    const total = failed + succeeded;
    const rate = total > 0 ? failed / total : 0;
    return { rate, failed, total, succeeded };
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
  
  // Calculate error rates
  const errorRate = calculateErrorRate(metrics.http_req_failed);
  const checksRate = metrics.checks ? (metrics.checks.passes / (metrics.checks.passes + metrics.checks.fails)) : 0;
  
  // Extract checks by group
  const groupChecks = [];
  if (summaryData.root_group && summaryData.root_group.groups) {
    Object.entries(summaryData.root_group.groups).forEach(([groupName, groupData]) => {
      if (groupData.checks) {
        let totalPasses = 0;
        let totalFails = 0;
        Object.values(groupData.checks).forEach(check => {
          totalPasses += check.passes || 0;
          totalFails += check.fails || 0;
        });
        const rate = totalPasses + totalFails > 0 ? totalPasses / (totalPasses + totalFails) : 0;
        groupChecks.push({
          name: groupName,
          passes: totalPasses,
          fails: totalFails,
          rate: rate,
          checks: groupData.checks
        });
      }
    });
  }
  
  // Generate timing rows
  const timingRows = [
    ['http_req_duration', 'Total Duration', '⏱️ Total time from start to finish'],
    ['http_req_waiting', 'Waiting (TTFB)', '⏳ Time waiting for server response'],
    ['http_req_receiving', 'Receiving', '📥 Time downloading response'],
    ['http_req_sending', 'Sending', '📤 Time uploading request'],
    ['http_req_blocked', 'Blocked', '🚧 Time blocked waiting for connection'],
    ['http_req_connecting', 'Connecting', '🔌 Time establishing TCP connection'],
    ['http_req_tls_handshaking', 'TLS Handshaking', '🔒 Time in SSL/TLS handshake']
  ].map(([key, label, description]) => {
    const m = metrics[key];
    if (!m) return '';
    const p95 = m['p(95)'] || 0;
    const colorStyle = p95 > 1000 ? 'color: #f56565;' : (p95 > 500 ? 'color: #ed8936;' : 'color: #48bb78;');
    return `
                    <tr>
                        <td><strong>${label}</strong><br><small style="color: #718096; font-weight: normal;">${description}</small></td>
                        <td>${formatDuration(m.avg)}</td>
                        <td>${formatDuration(m.min)}</td>
                        <td>${formatDuration(m.med)}</td>
                        <td>${formatDuration(m.max)}</td>
                        <td>${formatDuration(m['p(90)'])}</td>
                        <td style="${colorStyle}"><strong>${formatDuration(m['p(95)'])}</strong></td>
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
        .status-error { background: #f56565; color: white; }
        .info-box {
            background: #edf2f7;
            border-left: 4px solid #667eea;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
        .info-box h4 {
            margin-bottom: 10px;
            color: #2d3748;
        }
        .info-box p {
            margin: 5px 0;
            color: #4a5568;
            font-size: 0.9rem;
        }
        .progress-bar {
            width: 100%;
            height: 30px;
            background: #e2e8f0;
            border-radius: 15px;
            overflow: hidden;
            margin-top: 10px;
            position: relative;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #48bb78 0%, #38a169 100%);
            transition: width 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 0.85rem;
        }
        .progress-fill.warning {
            background: linear-gradient(90deg, #ed8936 0%, #dd6b20 100%);
        }
        .progress-fill.error {
            background: linear-gradient(90deg, #f56565 0%, #e53e3e 100%);
        }
        .check-detail {
            background: #f7fafc;
            padding: 10px;
            margin: 5px 0;
            border-radius: 5px;
            border-left: 3px solid #cbd5e0;
        }
        .check-detail.failed {
            border-left-color: #f56565;
            background: #fff5f5;
        }
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

        <div class="card" style="background: ${errorRate.rate < 0.05 && checksRate >= 0.95 ? 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)' : (errorRate.rate < 0.1 && checksRate >= 0.8 ? 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)' : 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)')}; color: white; border: none;">
            <h2 style="color: white; margin-bottom: 20px;">📋 Resumen Ejecutivo</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                <div>
                    <h3 style="font-size: 2.5rem; margin: 10px 0;">${errorRate.rate < 0.05 && checksRate >= 0.95 ? '✅ EXCELENTE' : (errorRate.rate < 0.1 && checksRate >= 0.8 ? '⚠️ ACEPTABLE' : '❌ REQUIERE ATENCIÓN')}</h3>
                    <p style="opacity: 0.9;">Estado General del Test</p>
                </div>
                <div>
                    <h3 style="font-size: 2.5rem; margin: 10px 0;">${formatPercent(1 - errorRate.rate)}</h3>
                    <p style="opacity: 0.9;">Tasa de Éxito HTTP</p>
                    <small style="opacity: 0.8;">${errorRate.succeeded} exitosos / ${errorRate.total} total</small>
                </div>
                <div>
                    <h3 style="font-size: 2.5rem; margin: 10px 0;">${formatPercent(checksRate)}</h3>
                    <p style="opacity: 0.9;">Checks Exitosos</p>
                    <small style="opacity: 0.8;">${metrics.checks?.passes || 0} / ${(metrics.checks?.passes || 0) + (metrics.checks?.fails || 0)} total</small>
                </div>
                <div>
                    <h3 style="font-size: 2.5rem; margin: 10px 0;">${formatDuration(metrics.http_req_duration?.['p(95)'])}</h3>
                    <p style="opacity: 0.9;">Tiempo de Respuesta p95</p>
                    <small style="opacity: 0.8;">95% de requests bajo este tiempo</small>
                </div>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.15); border-radius: 8px;">
                <h4 style="margin-bottom: 10px;">🎯 Análisis Rápido:</h4>
                <ul style="margin: 0; padding-left: 20px;">
                    ${errorRate.rate < 0.05 ? '<li>✅ Tasa de error HTTP excelente (<5%)</li>' : (errorRate.rate < 0.1 ? '<li>⚠️ Tasa de error HTTP aceptable (5-10%)</li>' : '<li>❌ Tasa de error HTTP alta (>10%) - Requiere investigación</li>')}
                    ${checksRate >= 0.95 ? '<li>✅ Validaciones (checks) pasando correctamente (>95%)</li>' : (checksRate >= 0.8 ? '<li>⚠️ Algunas validaciones fallando (80-95%)</li>' : '<li>❌ Muchas validaciones fallando (<80%)</li>')}
                    ${(metrics.http_req_duration?.['p(95)'] || 0) < 1000 ? '<li>✅ Tiempos de respuesta excelentes (<1s p95)</li>' : ((metrics.http_req_duration?.['p(95)'] || 0) < 2000 ? '<li>✅ Tiempos de respuesta buenos (<2s p95)</li>' : '<li>⚠️ Tiempos de respuesta lentos (>2s p95)</li>')}
                    <li>📊 Test ejecutado con hasta ${metrics.vus_max?.value || 0} usuarios virtuales concurrentes</li>
                    <li>🔄 Total de ${metrics.http_reqs?.count || 0} requests procesados</li>
                </ul>
            </div>
        </div>

        <div class="card">
            <h2>📊 Key Metrics</h2>
            
            <div class="info-box">
                <h4>📖 Entendiendo las Métricas de K6</h4>
                <p><strong>Virtual Users (VUs):</strong> Usuarios simulados concurrentes. El test subió de 1 → ${metrics.vus_max?.value || 0} usuarios para probar carga.</p>
                <p><strong>Failed Requests:</strong> Requests que devolvieron códigos de error (4xx, 5xx). Umbral aceptable: <5%</p>
                <p><strong>Checks:</strong> Validaciones personalizadas (ej: status code, contenido, tiempo). Objetivo: >95%</p>
            </div>
            
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
                <div class="metric-card" style="background: ${errorRate.rate < 0.05 ? 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)' : (errorRate.rate < 0.1 ? 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)' : 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)')};">
                    <div class="metric-label">Failed Requests</div>
                    <div class="metric-value">${formatPercent(errorRate.rate)}</div>
                    <div style="font-size: 0.85rem; opacity: 0.8; margin-top: 5px;">${errorRate.failed} failed / ${errorRate.total} total</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Data Transferred</div>
                    <div class="metric-value">${formatBytes(metrics.data_received?.count)}</div>
                    <div style="font-size: 0.85rem; opacity: 0.8; margin-top: 5px;">↓ ${formatBytes(metrics.data_received?.rate)}/s</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Virtual Users</div>
                    <div class="metric-value">${metrics.vus?.value || 0} / ${metrics.vus_max?.value || 0}</div>
                    <div style="font-size: 0.85rem; opacity: 0.8; margin-top: 5px;">Current / Max Peak</div>
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
            
            <div class="info-box" style="background: ${checksRate >= 0.95 ? '#f0fff4' : '#fff5f5'}; border-left-color: ${checksRate >= 0.95 ? '#48bb78' : '#f56565'};">
                <h4>${checksRate >= 0.95 ? '✅ Checks Status: PASSED' : '❌ Checks Status: FAILED'}</h4>
                <p><strong>Success Rate:</strong> ${formatPercent(checksRate)} (${metrics.checks?.passes || 0} passed, ${metrics.checks?.fails || 0} failed)</p>
                <div class="progress-bar">
                    <div class="progress-fill ${checksRate < 0.8 ? 'error' : (checksRate < 0.95 ? 'warning' : '')}" style="width: ${checksRate * 100}%;">
                        ${formatPercent(checksRate)}
                    </div>
                </div>
            </div>
            
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
                        <td><strong>Checks</strong><br><small style="color: #718096;">Validaciones personalizadas</small></td>
                        <td><span class="status-badge ${checksRate >= 0.95 ? 'status-success' : (checksRate >= 0.8 ? 'status-warning' : 'status-error')}">${formatPercent(checksRate)}</span></td>
                        <td>${metrics.checks?.passes || 0} ✅ passes / ${metrics.checks?.fails || 0} ❌ fails</td>
                    </tr>
                    <tr>
                        <td><strong>HTTP Request Failed</strong><br><small style="color: #718096;">Tasa de error HTTP (4xx, 5xx)</small></td>
                        <td><span class="status-badge ${errorRate.rate < 0.05 ? 'status-success' : (errorRate.rate < 0.1 ? 'status-warning' : 'status-error')}">${formatPercent(errorRate.rate)}</span></td>
                        <td>${errorRate.failed} ❌ failed / ${errorRate.succeeded} ✅ succeeded<br><small>${formatThresholds(metrics.http_req_failed?.thresholds)}</small></td>
                    </tr>
                    ${metrics.http_req_duration?.thresholds ? `
                    <tr>
                        <td><strong>Request Duration</strong><br><small style="color: #718096;">Tiempo de respuesta p95</small></td>
                        <td><span class="status-badge ${Object.values(metrics.http_req_duration.thresholds).every(v => v) ? 'status-success' : 'status-error'}">p(95): ${formatDuration(metrics.http_req_duration?.['p(95)'])}</span></td>
                        <td>${formatThresholds(metrics.http_req_duration.thresholds)}</td>
                    </tr>` : ''}
                </tbody>
            </table>
        </div>

        <div class="card">
            <h2>🔍 Desglose de Checks por Grupo</h2>
            <p style="margin-bottom: 20px; color: #4a5568;">Análisis detallado de validaciones por cada grupo de pruebas</p>
            
            ${groupChecks.map(group => {
                const percentage = group.rate * 100;
                const statusClass = percentage >= 95 ? '' : 'failed';
                const progressClass = percentage >= 95 ? '' : (percentage >= 80 ? 'warning' : 'error');
                
                return `
                <div class="check-detail ${statusClass}">
                    <h4 style="margin-bottom: 10px; color: #2d3748;">
                        ${percentage >= 95 ? '✅' : '❌'} ${group.name}
                    </h4>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span><strong>Success Rate:</strong> ${formatPercent(group.rate)}</span>
                        <span>${group.passes} ✅ / ${group.fails} ❌ / ${group.passes + group.fails} total</span>
                    </div>
                    <div class="progress-bar" style="height: 20px;">
                        <div class="progress-fill ${progressClass}" style="width: ${percentage}%; font-size: 0.75rem;">
                            ${formatPercent(group.rate)}
                        </div>
                    </div>
                    
                    ${group.fails > 0 ? `
                    <details style="margin-top: 10px;">
                        <summary style="cursor: pointer; color: #667eea; font-weight: 600;">Ver detalles de checks (${Object.keys(group.checks).length} checks)</summary>
                        <div style="margin-top: 10px; padding-left: 15px;">
                            ${Object.entries(group.checks).map(([checkName, checkData]) => `
                                <div style="margin: 8px 0; padding: 8px; background: white; border-radius: 4px; border-left: 3px solid ${checkData.fails > 0 ? '#f56565' : '#48bb78'};">
                                    <strong>${checkData.fails > 0 ? '❌' : '✅'} ${checkName}</strong><br>
                                    <small style="color: #718096;">Passes: ${checkData.passes} | Fails: ${checkData.fails}</small>
                                </div>
                            `).join('')}
                        </div>
                    </details>
                    ` : '<p style="margin-top: 10px; color: #48bb78; font-size: 0.9rem;">✅ Todos los checks pasaron exitosamente</p>'}
                </div>
                `;
            }).join('')}
            
            ${groupChecks.length === 0 ? '<p style="color: #718096;">No hay información de checks por grupo disponible.</p>' : ''}
        </div>

        <div class="card">
            <h2>ℹ️ Test Information</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                <div>
                    <strong>Test Duration:</strong><br>
                    <span style="font-size: 1.5rem; color: #667eea;">${formatDuration(metrics.iteration_duration?.avg)}</span>
                </div>
                <div>
                    <strong>Test Groups:</strong><br>
                    <span style="font-size: 1.5rem; color: #667eea;">${Object.keys(summaryData.root_group?.groups || {}).length}</span>
                </div>
                <div>
                    <strong>Virtual Users Peak:</strong><br>
                    <span style="font-size: 1.5rem; color: #667eea;">${metrics.vus_max?.value || 0}</span>
                </div>
                <div>
                    <strong>Total Iterations:</strong><br>
                    <span style="font-size: 1.5rem; color: #667eea;">${metrics.iterations?.count || 0}</span>
                </div>
            </div>
            <div class="status-badge status-success" style="margin-top: 20px;">Test Completed Successfully</div>
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
