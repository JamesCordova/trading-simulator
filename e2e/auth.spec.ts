import { test, expect } from '@playwright/test';

// Helper para esperar la carga de la página
async function waitForPageLoad(page: any) {
  await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 });
  
  // Esperar a que desaparezca el "Loading..."
  await page.waitForFunction(
    () => !document.body.textContent?.includes('Loading...'),
    { timeout: 60000 }
  );
  
  // Esperar a que aparezcan los campos de entrada
  await page.waitForSelector('input[type="email"]', { timeout: 30000 });
}

test.describe('Authentication Flow', () => {
  test('should display landing page with email and password inputs', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Verificar que existen los campos de entrada
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Ingresar email inválido directamente
    await page.locator('input[type="email"]').fill('invalid-email');
    await page.locator('input[type="password"]').fill('1234567890');
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Verificar mensaje de error (o que no navega)
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL('/');
  });

  test('should successfully sign in with valid credentials', async ({ page }) => {
    await waitForPageLoad(page);
    
    // Llenar credenciales directamente
    await page.locator('input[type="email"]').fill('najawow980@discounp.com');
    await page.locator('input[type="password"]').fill('1234567890');
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Esperar navegación al dashboard
    await page.waitForURL(/\/dashboard/, { timeout: 60000 });
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('should handle sign out', async ({ page }) => {
    // Primero hacer sign in
    await waitForPageLoad(page);
    await page.locator('input[type="email"]').fill('najawow980@discounp.com');
    await page.locator('input[type="password"]').fill('1234567890');
    await page.getByRole('button', { name: /sign in/i }).click();
    await page.waitForURL(/\/dashboard/, { timeout: 60000 });
    
    // Esperar que el dashboard cargue completamente
    await page.waitForTimeout(3000);
    
    // Abrir menú de usuario (hacer clic en el avatar o botón de usuario)
    const userMenuButton = page.locator('button').filter({ has: page.locator('div.bg-emerald-600.rounded-full') });
    await userMenuButton.click();
    
    // Esperar a que aparezca el menú desplegable
    await page.waitForTimeout(500);
    
    // Hacer clic en "Sign Out" dentro del menú
    await page.getByText('Sign Out').click();
    
    // Verificar redirección a landing page
    await page.waitForURL('/', { timeout: 30000 });
    await expect(page).toHaveURL('/');
  });

  test('should persist authentication state across page reloads', async ({ page }) => {
    // Hacer sign in
    await waitForPageLoad(page);
    await page.locator('input[type="email"]').fill('najawow980@discounp.com');
    await page.locator('input[type="password"]').fill('1234567890');
    await page.getByRole('button', { name: /sign in/i }).click();
    await page.waitForURL(/\/dashboard/, { timeout: 60000 });
    
    // Recargar página (sin esperar networkidle completo para evitar timeout)
    await page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(3000);
    
    // Verificar que sigue en dashboard
    await expect(page).toHaveURL(/\/dashboard/);
  });
});
