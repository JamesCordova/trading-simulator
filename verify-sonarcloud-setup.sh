#!/bin/bash

# 🔍 SonarCloud Setup Verification Script

echo "=================================="
echo "🔍 SonarCloud Setup Verification"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if sonar-project.properties exists
echo "1. Checking configuration files..."
if [ -f "sonar-project.properties" ]; then
    echo -e "${GREEN}✓${NC} sonar-project.properties found"
else
    echo -e "${RED}✗${NC} sonar-project.properties not found"
    exit 1
fi

# Check if SonarCloud workflow exists
if [ -f ".github/workflows/sonarcloud.yml" ]; then
    echo -e "${GREEN}✓${NC} SonarCloud workflow found"
else
    echo -e "${RED}✗${NC} SonarCloud workflow not found"
    exit 1
fi

echo ""
echo "2. Checking npm scripts..."
if grep -q '"test:coverage"' package.json; then
    echo -e "${GREEN}✓${NC} test:coverage script found"
else
    echo -e "${RED}✗${NC} test:coverage script not found"
    exit 1
fi

echo ""
echo "3. Checking GitHub secrets (manual verification required)..."
echo -e "${YELLOW}⚠${NC}  You need to manually verify these secrets in GitHub:"
echo "   - SONAR_TOKEN"
echo "   - SONAR_ORGANIZATION"
echo ""
echo "   Go to: https://github.com/Yemmy03/trading-sim-app/settings/secrets/actions"

echo ""
echo "4. SonarCloud project configuration:"
echo "   Project Key: Yemmy03_trading-sim-app"
echo "   Organization: yemmy03"
echo ""
echo -e "${YELLOW}⚠${NC}  Verify this matches your SonarCloud setup at:"
echo "   https://sonarcloud.io/projects"

echo ""
echo "=================================="
echo "📋 Next Steps:"
echo "=================================="
echo ""
echo "1. Get SONAR_TOKEN:"
echo "   → Go to https://sonarcloud.io/"
echo "   → My Account → Security"
echo "   → Generate Token"
echo ""
echo "2. Add secrets to GitHub:"
echo "   → https://github.com/Yemmy03/trading-sim-app/settings/secrets/actions"
echo "   → New repository secret"
echo "   → Name: SONAR_TOKEN"
echo "   → Value: [Your token]"
echo ""
echo "3. Add SONAR_ORGANIZATION:"
echo "   → New repository secret"
echo "   → Name: SONAR_ORGANIZATION"
echo "   → Value: yemmy03"
echo ""
echo "4. Enable GitHub Pages:"
echo "   → https://github.com/Yemmy03/trading-sim-app/settings/pages"
echo "   → Source: GitHub Actions"
echo ""
echo "5. Run the workflow:"
echo "   → https://github.com/Yemmy03/trading-sim-app/actions"
echo "   → Select 'SonarCloud Analysis'"
echo "   → Run workflow"
echo ""
echo "=================================="
echo -e "${GREEN}✓${NC} Setup verification complete!"
echo "=================================="
