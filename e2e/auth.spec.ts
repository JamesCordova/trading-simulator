import { test, expect } from '@playwright/test';
import { mockFirebaseAuth, mockUser } from './fixtures/mockData';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Interceptar requests de Firebase
    await mockFirebaseAuth(page);
  });

  test('should display landing page with sign in and sign up options', async ({ page }) => {
    await page.goto('/');
    
    // Verificar que la página principal carga
    await expect(page).toHaveTitle(/Trading Simulator/i);
    
    // Verificar que existen botones de autenticación
    const signInButton = page.getByRole('button', { name: /sign in/i });
    const signUpButton = page.getByRole('button', { name: /sign up/i });
    
    await expect(signInButton).toBeVisible();
    await expect(signUpButton).toBeVisible();
  });

  test('should show sign in form when clicking sign in button', async ({ page }) => {
    await page.goto('/');
    
    // Click en Sign In
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Verificar que aparece el formulario
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Ingresar email inválido
    await page.getByLabel(/email/i).fill('invalid-email');
    await page.getByLabel(/password/i).fill('password123');
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Verificar mensaje de error
    await expect(page.getByText(/invalid email/i)).toBeVisible();
  });

  test('should successfully sign in with valid credentials', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Llenar formulario
    await page.getByLabel(/email/i).fill(mockUser.email);
    await page.getByLabel(/password/i).fill('password123');
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Verificar redirección al dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByText(/welcome/i)).toBeVisible();
  });

  test('should show sign up form and validate fields', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /sign up/i }).click();
    
    // Verificar campos del formulario
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByLabel(/confirm password/i)).toBeVisible();
    
    // Intentar registro con contraseñas diferentes
    await page.getByLabel(/email/i).fill('newuser@example.com');
    await page.getByLabel(/^password$/i).fill('password123');
    await page.getByLabel(/confirm password/i).fill('different123');
    await page.getByRole('button', { name: /sign up/i }).click();
    
    // Verificar error
    await expect(page.getByText(/passwords.*match/i)).toBeVisible();
  });

  test('should successfully register new user', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /sign up/i }).click();
    
    // Llenar formulario correctamente
    await page.getByLabel(/email/i).fill('newuser@example.com');
    await page.getByLabel(/^password$/i).fill('password123');
    await page.getByLabel(/confirm password/i).fill('password123');
    await page.getByRole('button', { name: /sign up/i }).click();
    
    // Verificar redirección al dashboard
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('should handle sign out', async ({ page, context }) => {
    // Simular usuario autenticado
    await context.addCookies([{
      name: 'auth-token',
      value: 'mock-token',
      domain: 'localhost',
      path: '/',
    }]);
    
    await page.goto('/dashboard');
    
    // Click en sign out
    await page.getByRole('button', { name: /sign out/i }).click();
    
    // Verificar redirección a landing page
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });

  test('should persist authentication state across page reloads', async ({ page, context }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /sign in/i }).click();
    
    await page.getByLabel(/email/i).fill(mockUser.email);
    await page.getByLabel(/password/i).fill('password123');
    await page.getByRole('button', { name: /sign in/i }).click();
    
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Recargar página
    await page.reload();
    
    // Verificar que sigue en dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByText(/dashboard/i)).toBeVisible();
  });
});
