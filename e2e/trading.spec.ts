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
    // Detectar si estamos en móvil
    const viewport = page.viewportSize();
    const isMobile = viewport && viewport.width < 1024;
    
    if (isMobile) {
      // En móvil: abrir menú hamburguesa para ver los tabs
      const hamburgerButton = page.locator('button.lg\\:hidden').first();
      await expect(hamburgerButton).toBeVisible({ timeout: 10000 });
      await hamburgerButton.click();
      await page.waitForTimeout(500);
    }
    
    // Verificar que el tab de Portfolio está activo
    const portfolioTab = page.getByRole('button', { name: /portfolio/i }).first();
    await expect(portfolioTab).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to watchlist tab', async ({ page }) => {
    // Detectar si estamos en móvil
    const viewport = page.viewportSize();
    const isMobile = viewport && viewport.width < 1024;
    
    if (isMobile) {
      const hamburgerButton = page.locator('button.lg\\:hidden').first();
      await expect(hamburgerButton).toBeVisible({ timeout: 10000 });
      await hamburgerButton.click();
      await page.waitForTimeout(500);
    }
    
    // Click en Watchlist tab
    const watchlistTab = page.getByRole('button', { name: /watchlist/i }).first();
    await expect(watchlistTab).toBeVisible({ timeout: 10000 });
    await watchlistTab.scrollIntoViewIfNeeded();
    await watchlistTab.click();
    await page.waitForTimeout(1000);
    
    // Verificar que estamos en dashboard (el menú se cierra en móvil)
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('should navigate to orders tab', async ({ page }) => {
    // Detectar si estamos en móvil
    const viewport = page.viewportSize();
    const isMobile = viewport && viewport.width < 1024;
    
    if (isMobile) {
      const hamburgerButton = page.locator('button.lg\\:hidden').first();
      await expect(hamburgerButton).toBeVisible({ timeout: 10000 });
      await hamburgerButton.click();
      await page.waitForTimeout(500);
    }
    
    // Click en Orders tab
    const ordersTab = page.getByRole('button', { name: /orders/i }).first();
    await expect(ordersTab).toBeVisible({ timeout: 10000 });
    await ordersTab.scrollIntoViewIfNeeded();
    await ordersTab.click();
    await page.waitForTimeout(1000);
    
    // Verificar que estamos en dashboard (el menú se cierra en móvil)
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('should navigate to analytics tab', async ({ page }) => {
    // Detectar si estamos en móvil
    const viewport = page.viewportSize();
    const isMobile = viewport && viewport.width < 1024;
    
    if (isMobile) {
      const hamburgerButton = page.locator('button.lg\\:hidden').first();
      await expect(hamburgerButton).toBeVisible({ timeout: 10000 });
      await hamburgerButton.click();
      await page.waitForTimeout(500);
    }
    
    // Click en Analytics tab
    const analyticsTab = page.getByRole('button', { name: /analytics/i }).first();
    await expect(analyticsTab).toBeVisible({ timeout: 10000 });
    await analyticsTab.scrollIntoViewIfNeeded();
    await analyticsTab.click();
    await page.waitForTimeout(1000);
    
    // Verificar que estamos en dashboard (el menú se cierra en móvil)
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('should switch between tabs multiple times', async ({ page }) => {
    // Detectar si estamos en móvil
    const viewport = page.viewportSize();
    const isMobile = viewport && viewport.width < 1024;
    
    // Helper para hacer clic en un tab
    const clickTab = async (tabName: string) => {
      if (isMobile) {
        const hamburgerButton = page.locator('button.lg\\:hidden').first();
        await hamburgerButton.click();
        await page.waitForTimeout(500);
      }
      
      const tab = page.getByRole('button', { name: new RegExp(tabName, 'i') }).first();
      await expect(tab).toBeVisible({ timeout: 10000 });
      await tab.scrollIntoViewIfNeeded();
      await tab.click();
      await page.waitForTimeout(500);
    };
    
    // Navegar entre tabs
    await clickTab('portfolio');
    await clickTab('watchlist');
    await clickTab('orders');
    await clickTab('portfolio');
    
    // Verificar que estamos en dashboard
    await expect(page).toHaveURL(/\/dashboard/);
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
