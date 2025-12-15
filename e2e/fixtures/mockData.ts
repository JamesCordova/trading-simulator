/**
 * Mock data para pruebas E2E
 * Simula datos de Firebase y APIs externas
 */

export const mockUser = {
  uid: 'test-user-123',
  email: 'test@example.com',
  displayName: 'Test User',
  photoURL: null,
};

export const mockUserProfile = {
  uid: 'test-user-123',
  email: 'test@example.com',
  displayName: 'Test User',
  balance: 100000,
  createdAt: new Date('2024-01-01').toISOString(),
  currency: 'USD',
};

export const mockPortfolio = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    quantity: 10,
    averagePrice: 150.00,
    currentPrice: 180.00,
    totalValue: 1800.00,
    profitLoss: 300.00,
    profitLossPercent: 20.00,
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    quantity: 5,
    averagePrice: 2800.00,
    currentPrice: 3000.00,
    totalValue: 15000.00,
    profitLoss: 1000.00,
    profitLossPercent: 7.14,
  },
];

export const mockTransactions = [
  {
    id: 'tx-001',
    type: 'buy',
    symbol: 'AAPL',
    quantity: 10,
    price: 150.00,
    total: 1500.00,
    timestamp: new Date('2024-01-15').toISOString(),
  },
  {
    id: 'tx-002',
    type: 'buy',
    symbol: 'GOOGL',
    quantity: 5,
    price: 2800.00,
    total: 14000.00,
    timestamp: new Date('2024-01-20').toISOString(),
  },
];

export const mockWatchlist = [
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 380.00,
    change: 5.50,
    changePercent: 1.47,
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 250.00,
    change: -3.20,
    changePercent: -1.26,
  },
];

export const mockStockQuote = {
  symbol: 'AAPL',
  name: 'Apple Inc.',
  price: 180.00,
  change: 2.50,
  changePercent: 1.41,
  high: 182.00,
  low: 178.00,
  open: 179.00,
  previousClose: 177.50,
  volume: 50000000,
};

export const mockStockSearch = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: 'Common Stock',
    region: 'United States',
    currency: 'USD',
  },
  {
    symbol: 'AABA',
    name: 'Altaba Inc.',
    type: 'Common Stock',
    region: 'United States',
    currency: 'USD',
  },
];

/**
 * Interceptar requests de Firebase Auth
 */
export function mockFirebaseAuth(page: any) {
  return page.route('**/identitytoolkit.googleapis.com/**', (route: any) => {
    const url = route.request().url();
    
    if (url.includes('signInWithPassword')) {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          kind: 'identitytoolkit#VerifyPasswordResponse',
          localId: mockUser.uid,
          email: mockUser.email,
          displayName: mockUser.displayName,
          idToken: 'mock-id-token',
          refreshToken: 'mock-refresh-token',
          expiresIn: '3600',
        }),
      });
    } else if (url.includes('signUp')) {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          kind: 'identitytoolkit#SignupNewUserResponse',
          localId: mockUser.uid,
          email: mockUser.email,
          idToken: 'mock-id-token',
          refreshToken: 'mock-refresh-token',
          expiresIn: '3600',
        }),
      });
    } else {
      route.continue();
    }
  });
}

/**
 * Interceptar requests de Firestore
 */
export function mockFirestore(page: any) {
  return page.route('**/firestore.googleapis.com/**', (route: any) => {
    const url = route.request().url();
    
    if (url.includes('/users/')) {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          document: {
            name: `users/${mockUser.uid}`,
            fields: {
              email: { stringValue: mockUserProfile.email },
              displayName: { stringValue: mockUserProfile.displayName },
              balance: { doubleValue: mockUserProfile.balance },
              currency: { stringValue: mockUserProfile.currency },
            },
          },
        }),
      });
    } else if (url.includes('/portfolio')) {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          documents: mockPortfolio.map(item => ({
            name: `portfolio/${item.symbol}`,
            fields: {
              symbol: { stringValue: item.symbol },
              name: { stringValue: item.name },
              quantity: { integerValue: item.quantity },
              averagePrice: { doubleValue: item.averagePrice },
            },
          })),
        }),
      });
    } else {
      route.continue();
    }
  });
}

/**
 * Interceptar requests de APIs de stock (Alpha Vantage, etc.)
 */
export function mockStockAPI(page: any) {
  return page.route('**/alphavantage.co/**', (route: any) => {
    const url = route.request().url();
    
    if (url.includes('GLOBAL_QUOTE')) {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          'Global Quote': {
            '01. symbol': mockStockQuote.symbol,
            '05. price': mockStockQuote.price.toString(),
            '09. change': mockStockQuote.change.toString(),
            '10. change percent': `${mockStockQuote.changePercent}%`,
          },
        }),
      });
    } else if (url.includes('SYMBOL_SEARCH')) {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          bestMatches: mockStockSearch,
        }),
      });
    } else {
      route.continue();
    }
  });
}
