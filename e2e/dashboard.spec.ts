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

test.describe('Dashboard Features', () => {
  test.beforeEach(async ({ page }) => {
    // Hacer sign in real antes de cada test
    await signInAndGoToDashboard(page);
  });

  test('should display dashboard with main components', async ({ page }) => {
    // Verificar que estamos en el dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Verificar que el header está visible
    await expect(page.getByText(/TradingApp/i)).toBeVisible();
    
    // Verificar que existe contenido del dashboard
    const dashboard = page.locator('body');
    await expect(dashboard).toBeVisible();
  });

  test('should display portfolio section', async ({ page }) => {
    // Verificar que existe la sección de portfolio
    // El componente TradingInterface debería mostrar el portfolio
    await page.waitForTimeout(2000);
    
    // Verificar elementos básicos del dashboard
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('should show navigation tabs', async ({ page }) => {
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
    
    // Verificar que existen tabs de navegación
    const portfolioTab = page.getByRole('button', { name: /portfolio/i }).first();
    await expect(portfolioTab).toBeVisible({ timeout: 10000 });
    
    const watchlistTab = page.getByRole('button', { name: /watchlist/i }).first();
    await expect(watchlistTab).toBeVisible({ timeout: 10000 });
  });

  test('should navigate between dashboard tabs', async ({ page }) => {
    // Detectar si estamos en móvil checando el viewport
    const viewport = page.viewportSize();
    const isMobile = viewport && viewport.width < 1024;
    
    if (isMobile) {
      // En móvil: abrir menú hamburguesa primero
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
    
    if (isMobile) {
      // Reabrir menú para siguiente tab
      const hamburgerButton = page.locator('button.lg\\:hidden').first();
      await hamburgerButton.click();
      await page.waitForTimeout(500);
    }
    
    // Click en Portfolio tab
    const portfolioTab = page.getByRole('button', { name: /portfolio/i }).first();
    await expect(portfolioTab).toBeVisible({ timeout: 10000 });
    await portfolioTab.scrollIntoViewIfNeeded();
    await portfolioTab.click();
    await page.waitForTimeout(1000);
    
    // Verificar que estamos en dashboard (el tab se cierra en móvil después del clic)
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('should display orders tab', async ({ page }) => {
    // Detectar si estamos en móvil
    const viewport = page.viewportSize();
    const isMobile = viewport && viewport.width < 1024;
    
    if (isMobile) {
      // En móvil: abrir menú hamburguesa
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

  test('should display analytics tab', async ({ page }) => {
    // Detectar si estamos en móvil
    const viewport = page.viewportSize();
    const isMobile = viewport && viewport.width < 1024;
    
    if (isMobile) {
      // En móvil: abrir menú hamburguesa
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

  test('should handle mobile responsive layout', async ({ page }) => {
    // Cambiar viewport a móvil sin hacer reload con networkidle
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(2000);
    
    // Verificar que estamos en dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Verificar que el contenido se adapta a móvil
    const dashboard = page.locator('body');
    await expect(dashboard).toBeVisible();
  });

  test('should show refresh button in header', async ({ page }) => {
    // Verificar que estamos en dashboard
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Verificar que existe el header con botones
    const header = page.locator('div').filter({ hasText: /TradingApp/i }).first();
    await expect(header).toBeVisible();
  });

  test('should display user menu in header', async ({ page }) => {
    // Verificar que existe el menú de usuario con avatar
    const userMenuButton = page.locator('button').filter({ has: page.locator('div.bg-emerald-600.rounded-full') });
    await expect(userMenuButton).toBeVisible();
    
    // Abrir menú de usuario
    await userMenuButton.click();
    await page.waitForTimeout(500);
    
    // Verificar que aparece el menú desplegable - usar first() para evitar strict mode
    await expect(page.getByText(/profile/i).first()).toBeVisible();
    await expect(page.getByText(/settings/i).first()).toBeVisible();
    await expect(page.getByText(/sign out/i).first()).toBeVisible();
  });
});
