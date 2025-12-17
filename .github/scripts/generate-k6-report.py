#!/usr/bin/env python3
"""
Generate HTML report from K6 JSON results
Fallback solution when k6-html-reporter fails
"""

import json
import sys
from datetime import datetime

def format_duration(ms):
    """Format milliseconds to human readable"""
    if ms < 1000:
        return f"{ms:.2f}ms"
    elif ms < 60000:
        return f"{ms/1000:.2f}s"
    else:
        return f"{ms/60000:.2f}m"

def generate_html(json_file, output_file):
    """Generate HTML report from K6 JSON"""
    
    try:
        with open(json_file, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"❌ Error reading JSON: {e}")
        sys.exit(1)
    
    # Extract metrics
    metrics = data.get('metrics', {})
    
    # Get summary values
    http_reqs = metrics.get('http_reqs', {}).get('values', {}).get('count', 0)
    http_req_duration = metrics.get('http_req_duration', {}).get('values', {})
    http_req_failed = metrics.get('http_req_failed', {}).get('values', {})
    vus_max = metrics.get('vus_max', {}).get('values', {}).get('value', 0)
    iterations = metrics.get('iterations', {}).get('values', {}).get('count', 0)
    
    avg_duration = http_req_duration.get('avg', 0)
    p95_duration = http_req_duration.get('p(95)', 0)
    max_duration = http_req_duration.get('max', 0)
    
    failed_rate = http_req_failed.get('rate', 0) * 100
    
    # Generate HTML
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>K6 Performance Test Report</title>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 40px 20px;
        }}
        .container {{ max-width: 1200px; margin: 0 auto; }}
        .header {{
            text-align: center;
            color: white;
            margin-bottom: 40px;
        }}
        .header h1 {{ font-size: 2.5rem; margin-bottom: 10px; }}
        .card {{
            background: white;
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }}
        .metric-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }}
        .metric-card {{
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 25px;
            border-radius: 10px;
            text-align: center;
        }}
        .metric-value {{
            font-size: 2.5rem;
            font-weight: bold;
            margin: 10px 0;
        }}
        .metric-label {{
            font-size: 0.9rem;
            opacity: 0.9;
            text-transform: uppercase;
            letter-spacing: 1px;
        }}
        .status-badge {{
            display: inline-block;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: 600;
            margin-top: 10px;
        }}
        .status-success {{ background: #48bb78; color: white; }}
        .status-warning {{ background: #ed8936; color: white; }}
        .status-error {{ background: #f56565; color: white; }}
        .back-link {{
            display: inline-block;
            margin-top: 20px;
            padding: 12px 24px;
            background: white;
            color: #2d3748;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: transform 0.2s;
        }}
        .back-link:hover {{ transform: scale(1.05); }}
        table {{
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }}
        th, td {{
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
        }}
        th {{
            background: #f7fafc;
            font-weight: 600;
            color: #2d3748;
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 K6 Performance Test Report</h1>
            <p>Load Testing Results for Trading Simulator</p>
            <p style="opacity: 0.8; margin-top: 10px;">Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S UTC')}</p>
        </div>

        <div class="card">
            <h2>📊 Summary</h2>
            <div class="metric-grid">
                <div class="metric-card">
                    <div class="metric-label">Total Requests</div>
                    <div class="metric-value">{int(http_reqs)}</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Avg Response Time</div>
                    <div class="metric-value">{format_duration(avg_duration)}</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">P95 Response Time</div>
                    <div class="metric-value">{format_duration(p95_duration)}</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Max Response Time</div>
                    <div class="metric-value">{format_duration(max_duration)}</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Max VUs</div>
                    <div class="metric-value">{int(vus_max)}</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Failed Requests</div>
                    <div class="metric-value">{failed_rate:.2f}%</div>
                </div>
            </div>
            <div style="text-align: center; margin-top: 20px;">
                {"<span class='status-badge status-success'>✅ PASSED</span>" if failed_rate < 10 and p95_duration < 2000 else "<span class='status-badge status-warning'>⚠️ WARNING</span>" if failed_rate < 20 else "<span class='status-badge status-error'>❌ FAILED</span>"}
            </div>
        </div>

        <div class="card">
            <h2>🎯 Thresholds</h2>
            <table>
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Threshold</th>
                        <th>Actual</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>P95 Response Time</td>
                        <td>&lt; 2000ms</td>
                        <td>{format_duration(p95_duration)}</td>
                        <td>{"✅ Pass" if p95_duration < 2000 else "❌ Fail"}</td>
                    </tr>
                    <tr>
                        <td>Error Rate</td>
                        <td>&lt; 10%</td>
                        <td>{failed_rate:.2f}%</td>
                        <td>{"✅ Pass" if failed_rate < 10 else "❌ Fail"}</td>
                    </tr>
                    <tr>
                        <td>Total Requests</td>
                        <td>&gt; 0</td>
                        <td>{int(http_reqs)}</td>
                        <td>{"✅ Pass" if http_reqs > 0 else "❌ Fail"}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="card">
            <h2>📥 Raw Data</h2>
            <p>Download the complete JSON results for detailed analysis:</p>
            <a href="results.json" download class="back-link" style="margin-top: 10px;">Download JSON Results</a>
            <a href="console-output.txt" download class="back-link" style="margin-top: 10px; margin-left: 10px;">View Console Output</a>
        </div>

        <div style="text-align: center;">
            <a href="../" class="back-link">← Back to Reports Hub</a>
        </div>
    </div>
</body>
</html>"""
    
    try:
        with open(output_file, 'w') as f:
            f.write(html)
        print(f"✅ HTML report generated: {output_file}")
    except Exception as e:
        print(f"❌ Error writing HTML: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python3 generate-k6-report.py <input.json> <output.html>")
        sys.exit(1)
    
    generate_html(sys.argv[1], sys.argv[2])
