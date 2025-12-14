# 📈 Trading Simulator App

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Selected-Projects-Org_trading-sim-app&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Selected-Projects-Org_trading-sim-app)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Selected-Projects-Org_trading-sim-app&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Selected-Projects-Org_trading-sim-app)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Selected-Projects-Org_trading-sim-app&metric=bugs)](https://sonarcloud.io/summary/new_code?id=Selected-Projects-Org_trading-sim-app)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Selected-Projects-Org_trading-sim-app&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=Selected-Projects-Org_trading-sim-app)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Selected-Projects-Org_trading-sim-app&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Selected-Projects-Org_trading-sim-app)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Selected-Projects-Org_trading-sim-app&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Selected-Projects-Org_trading-sim-app)

## Overview
```
The Trading Simulator App is a web-based platform built with Next.js that allows users to simulate trading activities in a risk-free environment. Users can practice trading strategies, track performance, and interact with a simulated market without using real money. The app leverages Firebase for backend services and state management.
```

## 📊 Quality Reports

- **Test Coverage**: [View Coverage Report](https://yemmy03.github.io/trading-sim-app/coverage/)
- **CI/CD Dashboard**: [View Dashboard](https://yemmy03.github.io/trading-sim-app/dashboard/)
- **SonarCloud Analysis**: [View Quality Metrics](https://sonarcloud.io/project/overview?id=Selected-Projects-Org_trading-sim-app)
- **GitHub Actions**: [View Workflows](https://github.com/Yemmy03/trading-sim-app/actions)

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
