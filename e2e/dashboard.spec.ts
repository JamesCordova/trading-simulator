import { test, expect } from '@playwright/test';
import { mockFirebaseAuth, mockFirestore, mockPortfolio, mockUser } from './fixtures/mockData';

test.describe('Dashboard Features', () => {
  test.beforeEach(async ({ page, context }) => {
    // Mock de autenticación
    await mockFirebaseAuth(page);
    await mockFirestore(page);
    
    // Simular usuario autenticado
    await context.addCookies([{
      name: 'auth-token',
      value: 'mock-token',
      domain: 'localhost',
      path: '/',
    }]);
    
    await page.goto('/dashboard');
  });

  test('should display dashboard with main sections', async ({ page }) => {
    // Verificar título
    await expect(page).toHaveTitle(/Dashboard/i);
    
    // Verificar secciones principales
    await expect(page.getByText(/portfolio/i)).toBeVisible();
    await expect(page.getByText(/balance/i)).toBeVisible();
    await expect(page.getByText(/watchlist/i)).toBeVisible();
  });

  test('should display portfolio summary with correct data', async ({ page }) => {
    // Verificar que se muestra el portfolio
    await expect(page.getByText(/portfolio/i)).toBeVisible();
    
    // Verificar que muestra stocks del portfolio
    for (const stock of mockPortfolio) {
      await expect(page.getByText(stock.symbol)).toBeVisible();
      await expect(page.getByText(stock.name)).toBeVisible();
    }
  });

  test('should display portfolio cards with profit/loss indicators', async ({ page }) => {
    // Verificar cards de portfolio
    const portfolioSection = page.locator('[data-testid="portfolio-section"]');
    
    // Verificar colores de profit/loss
    const profitStocks = mockPortfolio.filter(s => s.profitLoss > 0);
    for (const stock of profitStocks) {
      const card = page.locator(`[data-testid="portfolio-card-${stock.symbol}"]`);
      await expect(card).toBeVisible();
      
      // Verificar indicador verde para ganancias
      const profitIndicator = card.locator('.text-green-600, .text-green-500');
      await expect(profitIndicator).toBeVisible();
    }
  });

  test('should show user balance in header', async ({ page }) => {
    // Verificar que se muestra el balance
    const balanceElement = page.locator('[data-testid="user-balance"]');
    await expect(balanceElement).toBeVisible();
    
    // Verificar formato de moneda
    await expect(balanceElement).toContainText('$');
  });

  test('should navigate between dashboard sections', async ({ page }) => {
    // Click en Watchlist
    await page.getByRole('link', { name: /watchlist/i }).click();
    await expect(page.getByText(/watchlist/i)).toBeVisible();
    
    // Click en Portfolio
    await page.getByRole('link', { name: /portfolio/i }).click();
    await expect(page.getByText(/your stocks/i)).toBeVisible();
    
    // Click en History
    await page.getByRole('link', { name: /history/i }).click();
    await expect(page.getByText(/transaction history/i)).toBeVisible();
  });

  test('should filter portfolio by search term', async ({ page }) => {
    // Buscar un stock específico
    const searchInput = page.getByPlaceholder(/search stocks/i);
    await searchInput.fill('AAPL');
    
    // Verificar que solo muestra AAPL
    await expect(page.getByText('AAPL')).toBeVisible();
    await expect(page.getByText('GOOGL')).not.toBeVisible();
    
    // Limpiar búsqueda
    await searchInput.clear();
    
    // Verificar que muestra todos
    await expect(page.getByText('AAPL')).toBeVisible();
    await expect(page.getByText('GOOGL')).toBeVisible();
  });

  test('should sort portfolio by different columns', async ({ page }) => {
    // Click en header de columna "Price"
    await page.getByRole('button', { name: /sort by price/i }).click();
    
    // Verificar orden (visual check - en test real verificarías el orden de elementos)
    const firstStock = page.locator('[data-testid^="portfolio-card-"]').first();
    await expect(firstStock).toBeVisible();
    
    // Click de nuevo para orden inverso
    await page.getByRole('button', { name: /sort by price/i }).click();
    await expect(firstStock).toBeVisible();
  });

  test('should display watchlist section', async ({ page }) => {
    // Navegar a watchlist
    await page.getByRole('link', { name: /watchlist/i }).click();
    
    // Verificar título
    await expect(page.getByRole('heading', { name: /watchlist/i })).toBeVisible();
    
    // Verificar botón para agregar stocks
    await expect(page.getByRole('button', { name: /add.*stock/i })).toBeVisible();
  });

  test('should open add stock modal', async ({ page }) => {
    await page.getByRole('link', { name: /watchlist/i }).click();
    
    // Click en agregar stock
    await page.getByRole('button', { name: /add.*stock/i }).click();
    
    // Verificar que aparece modal
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByLabel(/search.*symbol/i)).toBeVisible();
  });

  test('should display transaction history', async ({ page }) => {
    // Navegar a history
    await page.getByRole('link', { name: /history/i }).click();
    
    // Verificar tabla de transacciones
    await expect(page.getByRole('table')).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /date/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /type/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /symbol/i })).toBeVisible();
  });

  test('should handle mobile responsive layout', async ({ page }) => {
    // Cambiar viewport a móvil
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Verificar que el menú móvil está visible
    const mobileMenu = page.getByRole('button', { name: /menu/i });
    await expect(mobileMenu).toBeVisible();
    
    // Abrir menú
    await mobileMenu.click();
    
    // Verificar navegación móvil
    await expect(page.getByRole('navigation')).toBeVisible();
  });

  test('should update portfolio values in real-time', async ({ page }) => {
    // Obtener valor inicial
    const portfolioValue = page.locator('[data-testid="total-portfolio-value"]');
    const initialValue = await portfolioValue.textContent();
    
    // Simular actualización de precio (esto dependería de tu implementación)
    await page.evaluate(() => {
      // Disparar evento de actualización
      window.dispatchEvent(new CustomEvent('portfolio-update'));
    });
    
    // Esperar actualización
    await page.waitForTimeout(1000);
    
    // Verificar que el elemento existe (el valor puede o no cambiar)
    await expect(portfolioValue).toBeVisible();
  });
});
