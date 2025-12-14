# 🔍 SonarCloud Integration Guide

## Setup Instructions

### 1. Create SonarCloud Account
1. Go to [SonarCloud](https://sonarcloud.io/)
2. Sign in with your GitHub account
3. Click "Analyze new project"
4. Select your repository: `Yemmy03/trading-sim-app`

### 2. Generate SONAR_TOKEN
1. In SonarCloud, go to **My Account** → **Security**
2. Generate a new token:
   - Name: `trading-sim-app`
   - Type: User Token
   - Expiration: No expiration (or as needed)
3. Copy the token (you'll only see it once!)

### 3. Add Secrets to GitHub
Go to your repository settings: `https://github.com/Yemmy03/trading-sim-app/settings/secrets/actions`

Add these secrets:
- **Name**: `SONAR_TOKEN`
  - **Value**: [Paste your SonarCloud token]
  
- **Name**: `SONAR_ORGANIZATION`
  - **Value**: `yemmy03` (or your SonarCloud organization name)

### 4. Enable GitHub Pages
1. Go to repository **Settings** → **Pages**
2. Under "Build and deployment":
   - **Source**: GitHub Actions
3. Save

### 5. Run the Workflow
1. Go to **Actions** tab
2. Select "SonarCloud Analysis" workflow
3. Click "Run workflow"

## 📊 What Gets Analyzed

SonarCloud will analyze:
- ✅ Code quality
- ✅ Code smells
- ✅ Bugs
- ✅ Security vulnerabilities
- ✅ Code coverage
- ✅ Technical debt
- ✅ Duplicated code

## 🎯 Quality Gates

Default quality gate checks:
- Coverage > 80%
- Duplicated lines < 3%
- Maintainability rating = A
- Reliability rating = A
- Security rating = A

## 📈 Viewing Reports

After the workflow completes:

1. **SonarCloud Dashboard**: 
   - https://sonarcloud.io/project/overview?id=Yemmy03_trading-sim-app

2. **GitHub Pages Dashboard**:
   - https://yemmy03.github.io/trading-sim-app/
   - Includes SonarCloud badges and links

3. **Quality Status Page**:
   - https://yemmy03.github.io/trading-sim-app/sonarcloud-badge.html

## 🔖 Add Badges to README

Add these badges to your main README.md:

```markdown
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Yemmy03_trading-sim-app&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Yemmy03_trading-sim-app)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Yemmy03_trading-sim-app&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Yemmy03_trading-sim-app)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Yemmy03_trading-sim-app&metric=bugs)](https://sonarcloud.io/summary/new_code?id=Yemmy03_trading-sim-app)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Yemmy03_trading-sim-app&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=Yemmy03_trading-sim-app)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Yemmy03_trading-sim-app&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Yemmy03_trading-sim-app)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Yemmy03_trading-sim-app&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Yemmy03_trading-sim-app)
```

## 🚀 Automatic Triggers

SonarCloud analysis runs automatically on:
- Push to `main` or `develop` branches
- Pull requests to these branches
- Manual workflow dispatch

## 📝 Configuration Files

- `sonar-project.properties` - Main SonarCloud configuration
- `.github/workflows/sonarcloud.yml` - GitHub Actions workflow
- Coverage reports from Jest are sent automatically

## 🛠️ Troubleshooting

### Analysis fails
- Verify SONAR_TOKEN is valid
- Check that tests pass and generate coverage
- Ensure SonarCloud project is properly configured

### Quality Gate fails
- Review failing metrics in SonarCloud dashboard
- Fix identified issues
- Re-run the analysis

### Badges not showing
- Wait a few minutes after first analysis
- Check that project key matches: `Yemmy03_trading-sim-app`
- Verify SonarCloud project is public

## 📞 Support

- [SonarCloud Documentation](https://docs.sonarcloud.io/)
- [GitHub Actions Logs](https://github.com/Yemmy03/trading-sim-app/actions)
