#!/bin/bash
# Generate ZAP index.html with styling

OUTPUT_FILE="$1"

cat > "$OUTPUT_FILE" << 'HTMLEOF'
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>OWASP ZAP Security Reports</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:linear-gradient(135deg,#667eea,#764ba2);min-height:100vh;padding:40px 20px}
.container{max-width:1000px;margin:0 auto}
.header{text-align:center;color:white;margin-bottom:40px}
.header h1{font-size:2.5rem;margin-bottom:10px}
.card{background:white;border-radius:15px;padding:30px;margin-bottom:20px;box-shadow:0 10px 30px rgba(0,0,0,0.2)}
.report-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-top:20px}
.report-item{background:linear-gradient(135deg,#667eea,#764ba2);color:white;padding:30px;border-radius:10px;text-align:center;text-decoration:none;transition:transform .2s;display:block}
.report-item:hover{transform:translateY(-5px)}
.report-icon{font-size:3rem;margin-bottom:15px}
.report-title{font-size:1.3rem;font-weight:600;margin-bottom:10px}
.report-desc{font-size:.9rem;opacity:.9}
.back-link{display:inline-block;margin-top:20px;padding:12px 24px;background:white;color:#2d3748;text-decoration:none;border-radius:8px;font-weight:600;transition:transform .2s}
.back-link:hover{transform:scale(1.05)}
.g1{background:linear-gradient(135deg,#667eea,#764ba2)}
.g2{background:linear-gradient(135deg,#f093fb,#f5576c)}
.g3{background:linear-gradient(135deg,#4facfe,#00f2fe)}
</style>
</head>
<body>
<div class="container">
<div class="header">
<h1>OWASP ZAP Security Reports</h1>
<p>Dynamic Application Security Testing (DAST)</p>
</div>
<div class="card">
<h2>Security Scan Reports</h2>
<div class="report-grid">
<a href="zap-baseline-report.html" class="report-item g1">
<div class="report-icon">&#9889;</div>
<div class="report-title">Baseline Scan</div>
<div class="report-desc">Quick passive security scan</div>
</a>
<a href="zap-full-report.html" class="report-item g2">
<div class="report-icon">&#128269;</div>
<div class="report-title">Full Scan Report</div>
<div class="report-desc">Comprehensive active testing</div>
</a>
<a href="summary.md" class="report-item g3">
<div class="report-icon">&#128196;</div>
<div class="report-title">Summary</div>
<div class="report-desc">Scan overview and findings</div>
</a>
</div>
</div>
<div style="text-align:center">
<a href="../" class="back-link">Back to Reports Hub</a>
</div>
</div>
</body>
</html>
HTMLEOF

echo "✅ ZAP index.html generated at $OUTPUT_FILE"
