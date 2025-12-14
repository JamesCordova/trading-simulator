# 🔍 SonarCloud Setup Verification Script (PowerShell)

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "🔍 SonarCloud Setup Verification" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if sonar-project.properties exists
Write-Host "1. Checking configuration files..." -ForegroundColor Yellow
if (Test-Path "sonar-project.properties") {
    Write-Host "✓ sonar-project.properties found" -ForegroundColor Green
} else {
    Write-Host "✗ sonar-project.properties not found" -ForegroundColor Red
    exit 1
}

# Check if SonarCloud workflow exists
if (Test-Path ".github\workflows\sonarcloud.yml") {
    Write-Host "✓ SonarCloud workflow found" -ForegroundColor Green
} else {
    Write-Host "✗ SonarCloud workflow not found" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "2. Checking npm scripts..." -ForegroundColor Yellow
$packageJson = Get-Content "package.json" -Raw
if ($packageJson -match '"test:coverage"') {
    Write-Host "✓ test:coverage script found" -ForegroundColor Green
} else {
    Write-Host "✗ test:coverage script not found" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "3. Checking GitHub secrets (manual verification required)..." -ForegroundColor Yellow
Write-Host "⚠  You need to manually verify these secrets in GitHub:" -ForegroundColor Yellow
Write-Host "   - SONAR_TOKEN"
Write-Host "   - SONAR_ORGANIZATION"
Write-Host ""
Write-Host "   Go to: https://github.com/Yemmy03/trading-sim-app/settings/secrets/actions"

Write-Host ""
Write-Host "4. SonarCloud project configuration:" -ForegroundColor Yellow
Write-Host "   Project Key: Yemmy03_trading-sim-app"
Write-Host "   Organization: yemmy03"
Write-Host ""
Write-Host "⚠  Verify this matches your SonarCloud setup at:" -ForegroundColor Yellow
Write-Host "   https://sonarcloud.io/projects"

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Get SONAR_TOKEN:" -ForegroundColor White
Write-Host "   → Go to https://sonarcloud.io/" -ForegroundColor Gray
Write-Host "   → My Account → Security" -ForegroundColor Gray
Write-Host "   → Generate Token" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Add secrets to GitHub:" -ForegroundColor White
Write-Host "   → https://github.com/Yemmy03/trading-sim-app/settings/secrets/actions" -ForegroundColor Gray
Write-Host "   → New repository secret" -ForegroundColor Gray
Write-Host "   → Name: SONAR_TOKEN" -ForegroundColor Gray
Write-Host "   → Value: [Your token]" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Add SONAR_ORGANIZATION:" -ForegroundColor White
Write-Host "   → New repository secret" -ForegroundColor Gray
Write-Host "   → Name: SONAR_ORGANIZATION" -ForegroundColor Gray
Write-Host "   → Value: yemmy03" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Enable GitHub Pages:" -ForegroundColor White
Write-Host "   → https://github.com/Yemmy03/trading-sim-app/settings/pages" -ForegroundColor Gray
Write-Host "   → Source: GitHub Actions" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Run the workflow:" -ForegroundColor White
Write-Host "   → https://github.com/Yemmy03/trading-sim-app/actions" -ForegroundColor Gray
Write-Host "   → Select 'SonarCloud Analysis'" -ForegroundColor Gray
Write-Host "   → Run workflow" -ForegroundColor Gray
Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "✓ Setup verification complete!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
