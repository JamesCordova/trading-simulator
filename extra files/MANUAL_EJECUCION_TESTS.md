# 🚀 Manual de Ejecución de Pruebas
## Trading Simulator App

**Responsable:** Persona 2  
**Audiencia:** Equipo de desarrollo, QA, Evaluadores  
**Última actualización:** ${new Date().toLocaleDateString('es-ES')}

---

## 📋 TABLA DE CONTENIDOS

1. [Prerrequisitos](#prerrequisitos)
2. [Setup Inicial](#setup-inicial)
3. [Pruebas Unitarias (Jest)](#pruebas-unitarias-jest)
4. [Pruebas E2E (Playwright)](#pruebas-e2e-playwright)
5. [Pruebas de Seguridad (OWASP ZAP)](#pruebas-de-seguridad-owasp-zap)
6. [Pruebas de Performance (K6)](#pruebas-de-performance-k6)
7. [CI/CD Automatizado](#cicd-automatizado)
8. [Troubleshooting](#troubleshooting)

---

## 1. PRERREQUISITOS

### Software Requerido

| Software | Versión Mínima | Link |
|----------|----------------|------|
| **Node.js** | 20.x | https://nodejs.org/ |
| **npm** | 9.x | (incluido con Node.js) |
| **Git** | 2.x | https://git-scm.com/ |

### Software Opcional

| Software | Propósito |
|----------|-----------|
| **Docker** | Para pruebas de seguridad OWASP ZAP |
| **K6** | Para ejecutar pruebas de performance localmente |

---

## 2. SETUP INICIAL

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/JamesCordova/trading-simulator.git
cd trading-simulator
```

### Paso 2: Instalar Dependencias

```bash
npm ci
```

> 💡 **Nota:** Usamos `npm ci` en lugar de `npm install` para instalación limpia y determinística.

### Paso 3: Configurar Variables de Entorno (Opcional)

```bash
# Copiar archivo de ejemplo
cp .env.example .env.local

# Editar con tus credenciales de Firebase
# (No necesario para ejecutar tests)
```

### Paso 4: Verificar Instalación

```bash
npm run build
```

**Resultado esperado:** Build exitoso sin errores.

---

## 3. PRUEBAS UNITARIAS (JEST)

### 3.1 Ejecutar Todos los Tests

```bash
npm test
```

**Output esperado:**
```
Test Suites: 15 passed, 15 total
Tests:       219 passed, 219 total
Snapshots:   0 total
Time:        15.234 s
```

### 3.2 Ejecutar con Cobertura

```bash
npm test -- --coverage
```

**Output esperado:**
```
----------------------|---------|----------|---------|---------|
File                  | % Stmts | % Branch | % Funcs | % Lines |
----------------------|---------|----------|---------|---------|
All files             |   88.28 |    84.00 |  100.00 |   88.28 |
```

**Reporte HTML:** Abre `coverage/lcov-report/index.html` en tu navegador.

### 3.3 Ejecutar Tests en Watch Mode

```bash
npm test -- --watch
```

> 💡 **Útil para desarrollo:** Los tests se re-ejecutan automáticamente al guardar cambios.

### 3.4 Ejecutar Tests Específicos

```bash
# Por archivo
npm test Analytics.test.jsx

# Por patrón
npm test -- --testPathPattern=components

# Por nombre de test
npm test -- -t "renders correctly"
```

### 3.5 Opciones Útiles

```bash
# Verbose (más detalles)
npm test -- --verbose

# Actualizar snapshots
npm test -- -u

# Solo tests que fallaron
npm test -- --onlyFailures

# Ejecutar en paralelo
npm test -- --maxWorkers=4
```

---

## 4. PRUEBAS E2E (PLAYWRIGHT)

### 4.1 Instalar Navegadores (Primera vez)

```bash
npx playwright install
```

### 4.2 Ejecutar Tests E2E

```bash
npm run test:e2e
```

**Output esperado:**
```
Running 15 tests using 3 workers

  ✓ auth.spec.ts:5:5 › User can register (2.5s)
  ✓ auth.spec.ts:12:5 › User can login (1.8s)
  ...
  
15 passed (45.2s)
```

### 4.3 Ejecutar con UI Mode (Interactivo)

```bash
npx playwright test --ui
```

> 💡 **Modo visual:** Perfecto para debugging, permite ver el navegador y pausar tests.

### 4.4 Ejecutar Tests Específicos

```bash
# Por archivo
npx playwright test auth.spec.ts

# Por nombre
npx playwright test -g "User can login"

# En un navegador específico
npx playwright test --project=chromium
```

### 4.5 Ver Reporte

```bash
npx playwright show-report
```

**Reporte HTML:** Se abre automáticamente con resultados detallados, screenshots y videos.

### 4.6 Debugging

```bash
# Con inspector
npx playwright test --debug

# Con headed mode (ver navegador)
npx playwright test --headed

# Con slow motion
npx playwright test --headed --slow-mo=1000
```

---

## 5. PRUEBAS DE SEGURIDAD (OWASP ZAP)

### 5.1 Prerequisito: Docker

```bash
docker --version
```

### 5.2 Baseline Scan (Rápido)

```bash
docker run -t ghcr.io/zaproxy/zaproxy:stable \
  zap-baseline.py \
  -t https://trading-simulator-beryl.vercel.app
```

**Tiempo estimado:** 2-5 minutos

### 5.3 Full Scan (Completo)

```bash
docker run -t ghcr.io/zaproxy/zaproxy:stable \
  zap-full-scan.py \
  -t https://trading-simulator-beryl.vercel.app
```

**Tiempo estimado:** 10-30 minutos

### 5.4 Ver Reportes

Los reportes se generan en formato HTML y se publican automáticamente vía GitHub Actions en:
https://jamescordova.github.io/trading-simulator/zap/

**Documentación completa:** `OWASP_ZAP.md`

---

## 6. PRUEBAS DE PERFORMANCE (K6)

### 6.1 Instalar K6

**Windows (Chocolatey):**
```bash
choco install k6
```

**macOS (Homebrew):**
```bash
brew install k6
```

**Linux:**
```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

### 6.2 Ejecutar Test de Performance

```bash
k6 run k6/performance-test.js
```

**Output esperado:**
```
     ✓ Landing page - status is 200
     ✓ Dashboard - loads in < 3s
     
     checks.........................: 89.90% ✓ 12414      ✗ 1394  
     http_req_duration..............: avg=26.29ms min=8ms med=18ms max=2.5s p(95)=46.16ms
     http_reqs......................: 8280   38.92/s
```

### 6.3 Opciones de Ejecución

```bash
# Con más usuarios
k6 run --vus 100 --duration 60s k6/performance-test.js

# Guardar resultados
k6 run --out json=results.json k6/performance-test.js

# Con thresholds estrictos
k6 run --no-thresholds k6/performance-test.js
```

**Documentación completa:** `K6_PERFORMANCE.md`

---

## 7. CI/CD AUTOMATIZADO

### 7.1 GitHub Actions

Todos los tests se ejecutan automáticamente en cada:
- ✅ Push a cualquier rama
- ✅ Pull Request
- ✅ Workflow manual (workflow_dispatch)

### 7.2 Ver Resultados en GitHub

1. Ve a: https://github.com/JamesCordova/trading-simulator/actions
2. Selecciona el workflow (ej: "Node.js CI")
3. Click en el run específico
4. Revisa logs y reportes

### 7.3 Workflows Disponibles

| Workflow | Trigger | Tiempo |
|----------|---------|--------|
| `test.yml` | Push, PR | ~2 min |
| `playwright.yml` | Push, PR, Manual | ~3 min |
| `k6-performance.yml` | Manual, Weekly | ~4 min |
| `owasp-zap.yml` | Deploy, Weekly, Manual | ~10 min |
| `sonarcloud.yml` | Push | ~2 min |

### 7.4 Ejecutar Workflow Manualmente

1. Ve a Actions tab
2. Selecciona el workflow
3. Click "Run workflow"
4. Selecciona branch
5. Click "Run workflow" button

---

## 8. TROUBLESHOOTING

### Problema 1: Tests Fallan Localmente

**Síntoma:**
```
Error: Cannot find module 'xxx'
```

**Solución:**
```bash
# Limpiar y reinstalar
rm -rf node_modules package-lock.json
npm ci
```

### Problema 2: Playwright No Encuentra Navegadores

**Síntoma:**
```
Error: browserType.launch: Executable doesn't exist
```

**Solución:**
```bash
npx playwright install
```

### Problema 3: Tests de Jest Timeout

**Síntoma:**
```
Timeout - Async callback was not invoked within the 5000 ms timeout
```

**Solución:**
```bash
# Aumentar timeout en jest.config.js
testTimeout: 10000
```

### Problema 4: Firebase Emulator Issues

**Síntoma:**
```
Firebase: Error initializing app
```

**Solución:**
```bash
# Verificar que variables de entorno estén configuradas
# O usar mocks (ya configurado en jest.setup.js)
```

### Problema 5: Port Already in Use

**Síntoma:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solución:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Problema 6: K6 No Instalado

**Síntoma:**
```
k6: command not found
```

**Solución:**
Ver sección 6.1 para instrucciones de instalación por OS.

---

## 9. COMANDOS RÁPIDOS (CHEAT SHEET)

```bash
# Setup
npm ci                          # Instalar dependencias
npm run build                   # Build de producción

# Testing
npm test                        # Unit tests
npm test -- --coverage          # Con cobertura
npm run test:e2e               # E2E tests
npx playwright test --ui       # E2E interactivo

# Linting
npm run lint                    # ESLint check
npm run lint:fix               # ESLint auto-fix

# Development
npm run dev                     # Dev server (localhost:3000)

# Performance
k6 run k6/performance-test.js  # Performance test

# Reports (después de ejecutar tests)
open coverage/lcov-report/index.html        # Coverage report
npx playwright show-report                   # Playwright report
```

---

## 10. RECURSOS ADICIONALES

### Documentación del Proyecto
- `README.md` - Overview general
- `TESTING.md` - Guía de testing
- `PLAN_DE_PRUEBAS.md` - Plan completo
- `CASOS_PRUEBA_UNITARIAS.md` - Especificaciones

### Enlaces Externos
- [Jest Documentation](https://jestjs.io/)
- [Playwright Documentation](https://playwright.dev/)
- [K6 Documentation](https://k6.io/docs/)
- [OWASP ZAP Documentation](https://www.zaproxy.org/docs/)

### Reportes Online
- 📊 [Coverage](https://jamescordova.github.io/trading-simulator/coverage/)
- 🚀 [Dashboard](https://jamescordova.github.io/trading-simulator/dashboard/)
- 🛡️ [Security](https://jamescordova.github.io/trading-simulator/zap/)
- ⚡ [Performance](https://jamescordova.github.io/trading-simulator/k6/)

---

## 11. CONTACTO Y SOPORTE

**Para preguntas sobre el proyecto:**
- GitHub Issues: https://github.com/JamesCordova/trading-simulator/issues
- Documentación: Ver archivos *.md en la raíz del proyecto

**Responsables por área:**
- Unit Tests: Persona 2
- E2E Tests: Persona 4
- Security/Performance: Persona 3
- CI/CD: Persona 5
- General: Persona 1 (QA Lead)

---

**¡Feliz Testing! 🧪**
