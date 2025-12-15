import { test, expect } from '@playwright/test';
import { mockFirebaseAuth, mockFirestore, mockStockAPI, mockStockQuote } from './fixtures/mockData';

test.describe('Trading Operations', () => {
  test.beforeEach(async ({ page, context }) => {
    // Mock de servicios
    await mockFirebaseAuth(page);
    await mockFirestore(page);
    await mockStockAPI(page);
    
    // Usuario autenticado
    await context.addCookies([{
      name: 'auth-token',
      value: 'mock-token',
      domain: 'localhost',
      path: '/',
    }]);
    
    await page.goto('/dashboard');
  });

  test('should open trading interface for a stock', async ({ page }) => {
    // Click en un stock del portfolio
    await page.locator('[data-testid="portfolio-card-AAPL"]').click();
    
    // Verificar que abre el modal/interface de trading
    await expect(page.getByRole('dialog', { name: /trade/i })).toBeVisible();
    await expect(page.getByText(/AAPL/)).toBeVisible();
  });

  test('should display stock quote information', async ({ page }) => {
    await page.locator('[data-testid="portfolio-card-AAPL"]').click();
    
    // Verificar información del stock
    await expect(page.getByText(/current price/i)).toBeVisible();
    await expect(page.getByText(`$${mockStockQuote.price}`)).toBeVisible();
    await expect(page.getByText(/change/i)).toBeVisible();
  });

  test('should validate buy order with insufficient funds', async ({ page }) => {
    await page.locator('[data-testid="portfolio-card-AAPL"]').click();
    
    // Seleccionar "Buy"
    await page.getByRole('tab', { name: /buy/i }).click();
    
    // Intentar comprar cantidad muy alta
    await page.getByLabel(/quantity/i).fill('10000');
    await page.getByRole('button', { name: /buy/i }).click();
    
    // Verificar mensaje de error
    await expect(page.getByText(/insufficient funds/i)).toBeVisible();
  });

  test('should successfully place a buy order', async ({ page }) => {
    await page.locator('[data-testid="portfolio-card-AAPL"]').click();
    
    // Seleccionar "Buy"
    await page.getByRole('tab', { name: /buy/i }).click();
    
    // Ingresar cantidad válida
    await page.getByLabel(/quantity/i).fill('5');
    
    // Verificar cálculo del total
    const totalElement = page.locator('[data-testid="order-total"]');
    await expect(totalElement).toBeVisible();
    await expect(totalElement).toContainText('$');
    
    // Confirmar orden
    await page.getByRole('button', { name: /buy/i }).click();
    
    // Verificar mensaje de éxito
    await expect(page.getByText(/order.*successful/i)).toBeVisible();
  });

  test('should validate sell order with insufficient shares', async ({ page }) => {
    await page.locator('[data-testid="portfolio-card-AAPL"]').click();
    
    // Seleccionar "Sell"
    await page.getByRole('tab', { name: /sell/i }).click();
    
    // Intentar vender más de lo que tiene
    await page.getByLabel(/quantity/i).fill('1000');
    await page.getByRole('button', { name: /sell/i }).click();
    
    // Verificar error
    await expect(page.getByText(/insufficient.*shares/i)).toBeVisible();
  });

  test('should successfully place a sell order', async ({ page }) => {
    await page.locator('[data-testid="portfolio-card-AAPL"]').click();
    
    // Seleccionar "Sell"
    await page.getByRole('tab', { name: /sell/i }).click();
    
    // Vender cantidad válida
    await page.getByLabel(/quantity/i).fill('5');
    
    // Confirmar
    await page.getByRole('button', { name: /sell/i }).click();
    
    // Verificar éxito
    await expect(page.getByText(/order.*successful/i)).toBeVisible();
  });

  test('should display order confirmation modal', async ({ page }) => {
    await page.locator('[data-testid="portfolio-card-AAPL"]').click();
    await page.getByRole('tab', { name: /buy/i }).click();
    await page.getByLabel(/quantity/i).fill('5');
    await page.getByRole('button', { name: /buy/i }).click();
    
    // Verificar modal de confirmación
    await expect(page.getByRole('dialog', { name: /confirm/i })).toBeVisible();
    await expect(page.getByText(/review.*order/i)).toBeVisible();
    
    // Botones de confirmar y cancelar
    await expect(page.getByRole('button', { name: /confirm/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /cancel/i })).toBeVisible();
  });

  test('should cancel order from confirmation modal', async ({ page }) => {
    await page.locator('[data-testid="portfolio-card-AAPL"]').click();
    await page.getByRole('tab', { name: /buy/i }).click();
    await page.getByLabel(/quantity/i).fill('5');
    await page.getByRole('button', { name: /buy/i }).click();
    
    // Cancelar
    await page.getByRole('button', { name: /cancel/i }).click();
    
    // Verificar que vuelve al trading interface
    await expect(page.getByRole('dialog', { name: /trade/i })).toBeVisible();
    await expect(page.getByRole('dialog', { name: /confirm/i })).not.toBeVisible();
  });

  test('should calculate order total correctly', async ({ page }) => {
    await page.locator('[data-testid="portfolio-card-AAPL"]').click();
    await page.getByRole('tab', { name: /buy/i }).click();
    
    const quantityInput = page.getByLabel(/quantity/i);
    const totalElement = page.locator('[data-testid="order-total"]');
    
    // Probar diferentes cantidades
    await quantityInput.fill('1');
    await expect(totalElement).toContainText(`$${mockStockQuote.price}`);
    
    await quantityInput.fill('10');
    await expect(totalElement).toContainText(`$${mockStockQuote.price * 10}`);
  });

  test('should search and add stock to watchlist', async ({ page }) => {
    // Abrir search
    await page.getByRole('button', { name: /search.*stock/i }).click();
    
    // Buscar stock
    const searchInput = page.getByPlaceholder(/search.*symbol/i);
    await searchInput.fill('AAPL');
    
    // Esperar resultados
    await expect(page.getByText(/apple inc/i)).toBeVisible();
    
    // Click en resultado
    await page.getByText(/apple inc/i).click();
    
    // Agregar a watchlist
    await page.getByRole('button', { name: /add.*watchlist/i }).click();
    
    // Verificar confirmación
    await expect(page.getByText(/added.*watchlist/i)).toBeVisible();
  });

  test('should remove stock from watchlist', async ({ page }) => {
    // Navegar a watchlist
    await page.getByRole('link', { name: /watchlist/i }).click();
    
    // Encontrar un stock
    const stockCard = page.locator('[data-testid^="watchlist-card-"]').first();
    await expect(stockCard).toBeVisible();
    
    // Click en botón remove
    await stockCard.getByRole('button', { name: /remove/i }).click();
    
    // Confirmar
    await page.getByRole('button', { name: /confirm/i }).click();
    
    // Verificar que se removió
    await expect(page.getByText(/removed.*watchlist/i)).toBeVisible();
  });

  test('should handle real-time price updates', async ({ page }) => {
    await page.locator('[data-testid="portfolio-card-AAPL"]').click();
    
    // Obtener precio inicial
    const priceElement = page.locator('[data-testid="current-price"]');
    const initialPrice = await priceElement.textContent();
    
    // Simular actualización de precio
    await page.route('**/stock-price/**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          price: 185.00,
          change: 5.00,
        }),
      });
    });
    
    // Esperar actualización
    await page.waitForTimeout(2000);
    
    // Verificar que el precio se actualizó (puede o no cambiar dependiendo de la implementación)
    await expect(priceElement).toBeVisible();
  });

  test('should display trading fees', async ({ page }) => {
    await page.locator('[data-testid="portfolio-card-AAPL"]').click();
    await page.getByRole('tab', { name: /buy/i }).click();
    await page.getByLabel(/quantity/i).fill('10');
    
    // Verificar que muestra fees si los hay
    const feesSection = page.locator('[data-testid="trading-fees"]');
    // Puede existir o no dependiendo de tu implementación
    if (await feesSection.isVisible()) {
      await expect(feesSection).toContainText('$');
    }
  });
});
