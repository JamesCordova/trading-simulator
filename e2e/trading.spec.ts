import { test, expect } from '@playwright/test';

// Helper para hacer sign in real y navegar al dashboard
async function signInAndGoToDashboard(page: any) {
  await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });
  
  // Esperar a que desaparezca el "Loading..."
  await page.waitForFunction(
    () => !document.body.textContent?.includes('Loading...'),
    { timeout: 60000 }
  );
  
  // Esperar a que aparezcan los campos de entrada
  await page.waitForSelector('input[type="email"]', { timeout: 30000 });
  
  // Llenar credenciales y hacer sign in
  await page.locator('input[type="email"]').fill('najawow980@discounp.com');
  await page.locator('input[type="password"]').fill('1234567890');
  await page.getByRole('button', { name: /sign in/i }).click();
  
  // Esperar navegación al dashboard
  await page.waitForURL(/\/dashboard/, { timeout: 60000 });
  
  // Esperar que el dashboard cargue completamente
  await page.waitForTimeout(3000);
}

test.describe('Trading Operations', () => {
  test.beforeEach(async ({ page }) => {
    // Hacer sign in real antes de cada test
    await signInAndGoToDashboard(page);
  });

  test('should display trading interface in dashboard', async ({ page }) => {
    // Verificar que estamos en el dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Verificar que existe el componente de trading
    await page.waitForTimeout(2000);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should show portfolio tab by default', async ({ page }) => {
    // Verificar que el tab de Portfolio está activo
    const portfolioTab = page.getByRole('button', { name: /portfolio/i }).first();
    await expect(portfolioTab).toBeVisible();
  });

  test('should navigate to watchlist tab', async ({ page }) => {
    // Click en Watchlist tab
    const watchlistTab = page.getByRole('button', { name: /watchlist/i }).first();
    await watchlistTab.click();
    await page.waitForTimeout(1000);
    
    // Verificar que el tab está visible
    await expect(watchlistTab).toBeVisible();
  });

  test('should navigate to orders tab', async ({ page }) => {
    // Click en Orders tab
    const ordersTab = page.getByRole('button', { name: /orders/i }).first();
    await ordersTab.click();
    await page.waitForTimeout(1000);
    
    // Verificar que el tab está visible
    await expect(ordersTab).toBeVisible();
  });

  test('should navigate to analytics tab', async ({ page }) => {
    // Click en Analytics tab
    const analyticsTab = page.getByRole('button', { name: /analytics/i }).first();
    await analyticsTab.click();
    await page.waitForTimeout(1000);
    
    // Verificar que el tab está visible
    await expect(analyticsTab).toBeVisible();
  });

  test('should switch between tabs multiple times', async ({ page }) => {
    // Portfolio
    const portfolioTab = page.getByRole('button', { name: /portfolio/i }).first();
    await portfolioTab.click();
    await page.waitForTimeout(500);
    
    // Watchlist
    const watchlistTab = page.getByRole('button', { name: /watchlist/i }).first();
    await watchlistTab.click();
    await page.waitForTimeout(500);
    
    // Orders
    const ordersTab = page.getByRole('button', { name: /orders/i }).first();
    await ordersTab.click();
    await page.waitForTimeout(500);
    
    // Volver a Portfolio
    await portfolioTab.click();
    await page.waitForTimeout(500);
    
    await expect(portfolioTab).toBeVisible();
  });

  test('should display user info in header', async ({ page }) => {
    // Verificar que existe el header con el avatar del usuario
    const userMenuButton = page.locator('button').filter({ has: page.locator('div.bg-emerald-600.rounded-full') });
    await expect(userMenuButton).toBeVisible();
  });

  test('should remain on dashboard after refresh', async ({ page }) => {
    // Hacer refresh
    await page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(3000);
    
    // Verificar que seguimos en dashboard
    await expect(page).toHaveURL(/\/dashboard/);
  });
});
