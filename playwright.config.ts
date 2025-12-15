import { defineConfig, devices } from '@playwright/test';

/**
 * Configuración de Playwright para pruebas E2E
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  testMatch: /.*\.spec\.ts/,  // Solo archivos .spec.ts en e2e/
  
  /* Tiempo máximo de ejecución por test */
  timeout: 30 * 1000,
  
  /* Configuración de expect */
  expect: {
    timeout: 5000
  },
  
  /* Ejecutar tests en paralelo */
  fullyParallel: true,
  
  /* Fallar el build si dejaste test.only en el código */
  forbidOnly: !!process.env.CI,
  
  /* Reintentar tests fallidos en CI */
  retries: process.env.CI ? 2 : 0,
  
  /* Workers para paralelización - más workers = más rápido */
  workers: process.env.CI ? 4 : undefined,  // 4 workers en CI, todos los CPUs disponibles en local
  
  /* Reporter para generar reportes HTML y JSON */
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'playwright-report/results.json' }],
    ['junit', { outputFile: 'playwright-report/junit.xml' }],
    ['list']
  ],
  
  /* Configuración compartida para todos los proyectos */
  use: {
    /* URL base para navegación - usar producción en lugar de localhost */
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'https://trading-simulator-beryl.vercel.app',
    
    /* Capturar trace en el primer retry de test fallido */
    trace: 'on-first-retry',
    
    /* Capturar screenshot solo cuando falla */
    screenshot: 'only-on-failure',
    
    /* Capturar video solo cuando falla */
    video: 'retain-on-failure',
  },

  /* Configurar proyectos para diferentes navegadores */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    
    /* Descomentar para probar en más navegadores
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */
    
    /* Test en mobile viewports */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  /* No necesitamos webServer porque usamos la URL de producción hardcodeada */
});
