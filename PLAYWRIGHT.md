# 🎭 Playwright E2E Testing Guide

## Overview

Playwright tests are end-to-end tests that simulate real user interactions with the application. They test the complete user flow from authentication to trading operations with API mocking.

## 📁 Project Structure

```
e2e/
├── fixtures/
│   └── mockData.ts          # Mock data for Firebase, Firestore, Stock APIs
├── auth.spec.ts             # Authentication flow tests (8 tests)
├── dashboard.spec.ts        # Dashboard features tests (12 tests)
└── trading.spec.ts          # Trading operations tests (14 tests)

playwright.config.ts         # Playwright configuration
playwright-report/           # Generated after test runs
```

## 🚀 Running Tests

### Local Development

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI mode (interactive)
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Debug tests step-by-step
npm run test:e2e:debug

# Run specific test file
npx playwright test e2e/auth.spec.ts

# Run tests matching a pattern
npx playwright test --grep "sign in"
```

### View Reports

```bash
# Open HTML report
npm run test:e2e:report

# Or directly
npx playwright show-report playwright-report
```

## 🧪 Test Suites

### 1. Authentication Tests (`auth.spec.ts`)

Tests the complete authentication flow:

- ✅ Display landing page with sign in/up options
- ✅ Show sign in form
- ✅ Validate email format
- ✅ Successfully sign in with valid credentials
- ✅ Show sign up form and validate fields
- ✅ Successfully register new user
- ✅ Handle sign out
- ✅ Persist authentication state across reloads

**Coverage:** 8 tests

### 2. Dashboard Tests (`dashboard.spec.ts`)

Tests dashboard functionality:

- ✅ Display dashboard with main sections
- ✅ Display portfolio summary with correct data
- ✅ Display portfolio cards with profit/loss indicators
- ✅ Show user balance in header
- ✅ Navigate between dashboard sections
- ✅ Filter portfolio by search term
- ✅ Sort portfolio by different columns
- ✅ Display watchlist section
- ✅ Open add stock modal
- ✅ Display transaction history
- ✅ Handle mobile responsive layout
- ✅ Update portfolio values in real-time

**Coverage:** 12 tests

### 3. Trading Tests (`trading.spec.ts`)

Tests trading operations:

- ✅ Open trading interface for a stock
- ✅ Display stock quote information
- ✅ Validate buy order with insufficient funds
- ✅ Successfully place a buy order
- ✅ Validate sell order with insufficient shares
- ✅ Successfully place a sell order
- ✅ Display order confirmation modal
- ✅ Cancel order from confirmation modal
- ✅ Calculate order total correctly
- ✅ Search and add stock to watchlist
- ✅ Remove stock from watchlist
- ✅ Handle real-time price updates
- ✅ Display trading fees

**Coverage:** 13 tests

**Total E2E Tests: 33**

## 🎯 API Mocking

### Firebase Authentication

Mock functions intercept Firebase Auth requests:

```typescript
mockFirebaseAuth(page);
```

Mocks:
- `signInWithPassword` - Returns mock user token
- `signUp` - Returns mock registration response

### Firestore

Mock Firestore database calls:

```typescript
mockFirestore(page);
```

Mocks:
- User profile data
- Portfolio holdings
- Transaction history
- Watchlist items

### Stock APIs

Mock external stock API calls:

```typescript
mockStockAPI(page);
```

Mocks:
- Stock quotes (price, change, volume)
- Stock search results
- Real-time price updates

## 📊 Mock Data

All mock data is defined in `e2e/fixtures/mockData.ts`:

```typescript
export const mockUser = {
  uid: 'test-user-123',
  email: 'test@example.com',
  displayName: 'Test User',
};

export const mockPortfolio = [
  { symbol: 'AAPL', quantity: 10, averagePrice: 150.00 },
  { symbol: 'GOOGL', quantity: 5, averagePrice: 2800.00 },
];
```

## 🔧 Configuration

### Playwright Config (`playwright.config.ts`)

```typescript
{
  testDir: './e2e',
  timeout: 30 * 1000,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  
  projects: [
    { name: 'chromium', use: devices['Desktop Chrome'] },
    { name: 'Mobile Chrome', use: devices['Pixel 5'] },
  ],
}
```

### Browsers

Currently configured for:
- **Desktop Chrome** (Chromium)
- **Mobile Chrome** (Pixel 5)

To test on more browsers, uncomment in `playwright.config.ts`:
- Firefox
- WebKit (Safari)

## 🚀 CI/CD Integration

### GitHub Actions Workflow

Playwright tests run automatically on:
- Every push to `main`
- Every pull request
- Manual trigger via `workflow_dispatch`

Workflow file: `.github/workflows/playwright.yml`

### Artifacts

Generated artifacts:
- `playwright-report/` - Full HTML report
- `playwright-report/results.json` - JSON results
- `playwright-report/junit.xml` - JUnit format

### GitHub Pages

Reports are published to:
- 🔗 https://jamescordova.github.io/trading-simulator/playwright/

## 📈 Best Practices

### 1. Use Data Test IDs

```tsx
// In components
<div data-testid="portfolio-card-AAPL">

// In tests
await page.locator('[data-testid="portfolio-card-AAPL"]').click();
```

### 2. Wait for Elements

```typescript
// Good
await expect(page.getByRole('button')).toBeVisible();

// Better
await page.waitForLoadState('networkidle');
```

### 3. Mock API Calls

Always mock external APIs to:
- Ensure consistent test data
- Avoid rate limits
- Speed up tests
- Test edge cases

### 4. Test User Flows

Test complete user journeys, not isolated actions:

```typescript
// ✅ Good - Complete flow
test('user can sign in and buy stock', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /sign in/i }).click();
  await page.getByLabel(/email/i).fill('user@example.com');
  // ... complete the flow
});
```

### 5. Use Fixtures

Centralize test data in fixtures:

```typescript
import { mockUser, mockPortfolio } from './fixtures/mockData';
```

## 🐛 Debugging

### Visual Debugging

```bash
# Run with Playwright Inspector
npm run test:e2e:debug

# Run specific test in debug mode
npx playwright test auth.spec.ts --debug
```

### Trace Viewer

After a failed test:

```bash
npx playwright show-trace playwright-report/trace.zip
```

### Screenshots & Videos

Failed tests automatically capture:
- Screenshots in `test-results/`
- Videos in `test-results/`

## 📝 Writing New Tests

### Test Template

```typescript
import { test, expect } from '@playwright/test';
import { mockFirebaseAuth, mockFirestore } from './fixtures/mockData';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page, context }) => {
    // Setup mocks
    await mockFirebaseAuth(page);
    await mockFirestore(page);
    
    // Set cookies if needed
    await context.addCookies([{
      name: 'auth-token',
      value: 'mock-token',
      domain: 'localhost',
      path: '/',
    }]);
    
    await page.goto('/dashboard');
  });

  test('should do something', async ({ page }) => {
    // Arrange
    const button = page.getByRole('button', { name: /click me/i });
    
    // Act
    await button.click();
    
    // Assert
    await expect(page.getByText(/success/i)).toBeVisible();
  });
});
```

## 🔍 Common Patterns

### Waiting for Navigation

```typescript
await Promise.all([
  page.waitForNavigation(),
  page.getByRole('button', { name: /submit/i }).click(),
]);
```

### Filling Forms

```typescript
await page.getByLabel(/email/i).fill('user@example.com');
await page.getByLabel(/password/i).fill('password123');
await page.getByRole('button', { name: /sign in/i }).click();
```

### Checking Visibility

```typescript
await expect(page.getByText(/welcome/i)).toBeVisible();
await expect(page.getByRole('button', { name: /cancel/i })).not.toBeVisible();
```

### Route Interception

```typescript
await page.route('**/api/stock/**', (route) => {
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ price: 100 }),
  });
});
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [API Testing Guide](https://playwright.dev/docs/api-testing)
- [Trace Viewer](https://playwright.dev/docs/trace-viewer)

## 🎯 Coverage Goals

- **Authentication:** 100% of auth flows
- **Dashboard:** All main features and navigation
- **Trading:** Complete buy/sell operations
- **Mobile:** Responsive layouts
- **Error Handling:** Edge cases and validations

**Current Coverage: 33 E2E tests across 3 test suites**
