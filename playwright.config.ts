import { defineConfig, devices } from '@playwright/test';

/**
 * Configuración de Playwright para pruebas E2E
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  
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
  
  /* Workers para paralelización */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter para generar reportes HTML y JSON */
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'playwright-report/results.json' }],
    ['junit', { outputFile: 'playwright-report/junit.xml' }],
    ['list']
  ],
  
  /* Configuración compartida para todos los proyectos */
  use: {
    /* URL base para navegación */
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000',
    
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

  /* Servidor de desarrollo */
  webServer: {
    command: 'npm run build && npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
