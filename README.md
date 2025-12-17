# 📈 Trading Simulator App

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=selected-projects-org_trading-sim-app&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=selected-projects-org_trading-sim-app)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=selected-projects-org_trading-sim-app&metric=coverage)](https://sonarcloud.io/summary/new_code?id=selected-projects-org_trading-sim-app)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=selected-projects-org_trading-sim-app&metric=bugs)](https://sonarcloud.io/summary/new_code?id=selected-projects-org_trading-sim-app)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=selected-projects-org_trading-sim-app&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=selected-projects-org_trading-sim-app)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=selected-projects-org_trading-sim-app&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=selected-projects-org_trading-sim-app)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=selected-projects-org_trading-sim-app&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=selected-projects-org_trading-sim-app)

## Overview
```
The Trading Simulator App is a web-based platform built with Next.js that allows users to simulate trading activities in a risk-free environment. Users can practice trading strategies, track performance, and interact with a simulated market without using real money. The app leverages Firebase for backend services and state management.
```

## 📊 Quality Reports

- **Test Coverage**: [View Coverage Report](https://jamescordova.github.io/trading-simulator/coverage/)
- **CI/CD Dashboard**: [View Dashboard](https://jamescordova.github.io/trading-simulator/dashboard/)
- **SonarCloud Analysis**: [View Quality Metrics](https://sonarcloud.io/project/overview?id=selected-projects-org_trading-sim-app)
- **OWASP ZAP Security**: [View Security Reports](https://jamescordova.github.io/trading-simulator/zap/)
- **K6 Performance**: [View Performance Reports](https://jamescordova.github.io/trading-simulator/k6/)
- **GitHub Actions**: [View Workflows](https://github.com/JamesCordova/trading-simulator/actions)

# Features
```
Real-time trading simulation

User portfolio tracking

Historical trade performance

Interactive charts and dashboards

Responsive design for desktop and mobile
```

# Technology Stack
```
Frontend: Next.js, React

Backend / Database: Firebase Firestore

Styling: PostCSS

Containerization: Docker (production-ready image)

Deployment: Kubernetes (optional for local or cloud deployment)
```

# Installation Prerequisites
```
Node.js v18+

npm v9+

Docker (for containerized deployment)

(Optional) K3s/Kubernetes for local cluster deployment
```

# Local Setup
```
Clone the repository:
git clone <repository-url>
cd trading-sim

Install dependencies:
npm ci

Run the development server:
npm run dev

OR

Skip last two steps and move to Docker Setup below
P.S. npm run dev without a docker containerization only ensure the codebase is not broken

Open http://localhost:3000 to view the app (if you ran npm ci or npm run dev)
```
# Docker Setup
```
Build the Docker Image
docker build -t trading-sim-app .

Run the Container
docker run -d -p 3000:3000 trading-sim-app

Access the app at http://localhost:3000
```
# Continuous Integration (CI)

This project is set up with a GitHub Actions workflow to ensure code quality and build integrity on every push or pull request. The CI pipeline includes:
```
Installing dependencies
Running lint and type checks
Building the Next.js application
Running automated tests
```
The above ensures that the code is always verified before being deployed to production or containerized environments.

# Security Testing

## 🛡️ OWASP ZAP DAST

The project includes automated security testing using OWASP ZAP (Zed Attack Proxy) for Dynamic Application Security Testing (DAST):

- **Baseline Scan**: Passive security scan that runs after each deployment
- **Full Scan**: Comprehensive active security testing
- **Weekly Scans**: Automated security audits every Monday
- **Manual Scans**: On-demand security testing via GitHub Actions

### View Security Reports
- [Security Dashboard](https://yemmy03.github.io/trading-sim-app/zap/)
- [OWASP ZAP Documentation](./OWASP_ZAP.md)

### Security Features Tested
- SQL Injection vulnerabilities
- Cross-Site Scripting (XSS)
- Security headers configuration
- CSRF protection
- Cookie security
- And more...

## 🚀 K6 Performance Testing

The project includes automated performance testing using K6 for load and stress testing:

- **Load Testing**: Simulates 20-50 concurrent users
- **Stress Testing**: Tests application under peak load conditions
- **Response Time Monitoring**: Validates p95 < 2s
- **Error Rate Tracking**: Ensures < 10% error rate

### View Performance Reports
- [Performance Dashboard](https://jamescordova.github.io/trading-simulator/k6/)
- [K6 Documentation](./K6_PERFORMANCE.md)

### Performance Metrics
- Landing page load time
- Dashboard response time
- Static asset loading
- Multi-page navigation performance
- Concurrent user handling
