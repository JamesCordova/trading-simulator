# 📋 Plan de Pruebas - Trading Simulator App
## Laboratorio de Calidad de Software

**Responsable:** Persona 1 (Project Manager & QA Lead)  
**Versión:** 1.0  
**Fecha:** [Completar]  
**Estado:** En Revisión

---

## 1. INTRODUCCIÓN

### 1.1 Propósito del Documento
Este documento describe el plan de pruebas completo para la aplicación Trading Simulator, incluyendo el alcance, estrategia, recursos, cronograma y criterios de aceptación para todas las actividades de testing.

### 1.2 Alcance del Proyecto
**Aplicación bajo prueba:** Trading Simulator App  
**Tecnologías:** Next.js 14, React 18, Firebase, Firestore  
**Tipo de aplicación:** Web Application (SPA)  
**URL de producción:** https://trading-simulator-beryl.vercel.app  
**Repositorio:** https://github.com/JamesCordova/trading-simulator

### 1.3 Audiencia
- Equipo de desarrollo
- Equipo de QA
- Stakeholders del proyecto
- Instructor del curso

---

## 2. OBJETIVOS DEL PLAN DE PRUEBAS

### 2.1 Objetivos Generales
- [ ] Validar que la aplicación cumple con todos los requisitos funcionales
- [ ] Verificar la calidad del código mediante pruebas unitarias (>80% cobertura)
- [ ] Asegurar la seguridad de la aplicación (OWASP Top 10)
- [ ] Garantizar el rendimiento bajo carga (50+ usuarios concurrentes)
- [ ] Validar la experiencia de usuario end-to-end

### 2.2 Objetivos Específicos
- [ ] **Cobertura de código:** Mínimo 80% (Objetivo: 90%)
- [ ] **Tasa de éxito de pruebas:** Mínimo 95%
- [ ] **Tiempo de respuesta:** p95 < 2 segundos
- [ ] **Tasa de error HTTP:** < 5%
- [ ] **Vulnerabilidades críticas:** 0
- [ ] **Bugs bloqueantes:** 0

---

## 3. ALCANCE DE LAS PRUEBAS

### 3.1 Funcionalidades en Alcance

#### ✅ Módulo de Autenticación
- Registro de usuarios
- Login/Logout
- Gestión de sesión
- Recuperación de contraseña
- Validación de formularios

#### ✅ Módulo de Dashboard
- Visualización de portfolio
- Resumen de inversiones
- Gráficos y analytics
- Navegación entre secciones

#### ✅ Módulo de Trading
- Búsqueda de acciones
- Compra de acciones
- Venta de acciones
- Historial de órdenes
- Actualización de portfolio

#### ✅ Módulo de Portfolio
- Visualización de posiciones
- Cálculo de P&L (Profit & Loss)
- Valor total del portfolio
- Performance histórico

#### ✅ Módulo de Watchlist
- Agregar acciones a watchlist
- Eliminar acciones de watchlist
- Visualización de precios

### 3.2 Funcionalidades Fuera de Alcance
- ❌ Integración con APIs de mercado real (se usan datos simulados)
- ❌ Procesamiento de pagos reales
- ❌ Notificaciones push móviles
- ❌ Trading algorítmico avanzado

### 3.3 Tipos de Pruebas Incluidas
- ✅ **Pruebas Unitarias** (Unit Testing)
- ✅ **Pruebas de Integración** (Integration Testing)
- ✅ **Pruebas de Sistema** (System Testing)
- ✅ **Pruebas End-to-End** (E2E Testing)
- ✅ **Pruebas de Seguridad** (Security Testing - DAST)
- ✅ **Pruebas de Rendimiento** (Performance Testing)
- ✅ **Pruebas de Usabilidad** (Lighthouse Metrics)

---

## 4. ESTRATEGIA DE PRUEBAS

### 4.1 Niveles de Pruebas

#### **Nivel 1: Pruebas Unitarias**
- **Herramienta:** Jest + React Testing Library
- **Responsable:** Persona 2
- **Objetivo:** Validar componentes individuales
- **Cobertura objetivo:** 85%+
- **Criterio de éxito:** Todos los tests pasan, cobertura >80%

**Componentes probados:**
- Analytics
- DashboardHeader
- LoadingSpinner
- OrderHistory
- Portfolio
- PortfolioCard
- PortfolioSummary
- StockSearchList
- Watchlist
- auth.js
- firebase.js

#### **Nivel 2: Pruebas de Integración**
- **Herramienta:** Jest
- **Responsable:** Persona 2
- **Objetivo:** Validar interacción entre componentes
- **Cobertura objetivo:** Flujos críticos cubiertos

**Áreas probadas:**
- Integración con Firebase
- Flujos de autenticación
- Manejo de estado global
- Comunicación componente-servicio

#### **Nivel 3: Pruebas de Sistema**
- **Herramienta:** Playwright
- **Responsable:** Persona 4
- **Objetivo:** Validar funcionalidad completa del sistema
- **Criterio de éxito:** Todos los flujos principales funcionan

**Flujos probados:**
- Autenticación completa
- Navegación del dashboard
- Operaciones de trading

#### **Nivel 4: Pruebas de Aceptación**
- **Herramienta:** Playwright + Manual Testing
- **Responsable:** Persona 1, 4
- **Objetivo:** Validar requisitos del usuario
- **Criterio de éxito:** Cumple requisitos funcionales

### 4.2 Tipos de Pruebas No Funcionales

#### **Pruebas de Seguridad**
- **Herramienta:** OWASP ZAP
- **Responsable:** Persona 3
- **Frecuencia:** Semanal + Post-deployment
- **Objetivo:** Identificar vulnerabilidades

**Pruebas incluidas:**
- SQL Injection
- Cross-Site Scripting (XSS)
- Security Headers
- CSRF Protection
- Cookie Security
- Authentication bypass

#### **Pruebas de Rendimiento**
- **Herramienta:** K6
- **Responsable:** Persona 3
- **Objetivo:** Validar performance bajo carga
- **Escenarios:**
  - 20 usuarios concurrentes (carga normal)
  - 50 usuarios concurrentes (pico)
  - Pruebas de stress

**Métricas clave:**
- Response time p95 < 2s
- Error rate < 5%
- Throughput > 10 req/s

#### **Pruebas de Usabilidad**
- **Herramienta:** Lighthouse
- **Responsable:** Persona 3
- **Objetivo:** Validar métricas web core

**Métricas:**
- Performance > 90
- Accessibility > 90
- Best Practices > 90
- SEO > 90

---

## 5. CRITERIOS DE ENTRADA Y SALIDA

### 5.1 Criterios de Entrada (Entry Criteria)

**Para Pruebas Unitarias:**
- ✅ Código implementado y commiteado
- ✅ Build exitoso
- ✅ Lint checks pasados

**Para Pruebas E2E:**
- ✅ Aplicación deployada en ambiente de staging/producción
- ✅ Pruebas unitarias pasadas
- ✅ Base de datos configurada

**Para Pruebas de Seguridad:**
- ✅ Aplicación accesible vía HTTPS
- ✅ Configuración de seguridad implementada

**Para Pruebas de Performance:**
- ✅ Aplicación deployada en producción
- ✅ Datos de prueba preparados

### 5.2 Criterios de Salida (Exit Criteria)

**Criterios Obligatorios:**
- ✅ Todos los tests unitarios pasan (219/219)
- ✅ Cobertura de código > 80% (actual: 88.28%)
- ✅ Todos los tests E2E pasan
- ✅ 0 vulnerabilidades críticas
- ✅ 0 bugs bloqueantes
- ✅ Performance dentro de SLAs

**Criterios Opcionales:**
- ✅ Quality Gate PASSED en SonarCloud
- ✅ Security Rating A
- ✅ Maintainability Rating A
- ✅ Lighthouse score > 90

### 5.3 Criterios de Suspensión

**Se suspenden las pruebas si:**
- ❌ Build falla continuamente
- ❌ Ambiente de pruebas no disponible
- ❌ Bloqueo crítico en funcionalidad principal
- ❌ Más del 30% de tests fallando

---

## 6. AMBIENTE DE PRUEBAS

### 6.1 Ambientes Configurados

| Ambiente | URL | Propósito | Base de Datos |
|----------|-----|-----------|---------------|
| **Local** | http://localhost:3000 | Desarrollo | Firebase Emulator |
| **CI/CD** | GitHub Actions | Tests automatizados | Firebase Test |
| **Staging** | N/A | Pre-producción | Firebase Dev |
| **Production** | https://trading-simulator-beryl.vercel.app | Producción | Firebase Prod |

### 6.2 Configuración de Herramientas

**CI/CD Pipeline:**
- GitHub Actions (10 workflows configurados)
- Node.js 20.x
- npm para gestión de dependencias

**Testing Tools:**
- Jest 29.x - Unit testing
- Playwright 1.x - E2E testing
- K6 - Performance testing
- OWASP ZAP - Security testing
- Lighthouse - Web vitals

**Quality Tools:**
- SonarCloud - Code quality
- ESLint - Linting
- Prettier - Code formatting

### 6.3 Datos de Prueba

**Usuarios de Prueba:**
```
Email: test@example.com
Password: [Definir]
```

**Datos Mock:**
- Mock stocks data en `e2e/fixtures/mockData.ts`
- Firebase emulator data
- Datos de prueba para portfolio

---

## 7. RECURSOS Y RESPONSABILIDADES

### 7.1 Equipo de Pruebas

| Rol | Nombre | Responsabilidades |
|-----|--------|-------------------|
| **QA Lead** | Persona 1 | Planificación, coordinación, reportes |
| **Test Engineer** | Persona 2 | Unit & Integration tests |
| **Security/Perf Tester** | Persona 3 | Security & Performance tests |
| **E2E Tester** | Persona 4 | System & E2E tests |
| **DevOps** | Persona 5 | Infrastructure, CI/CD |

### 7.2 Matriz RACI

Ver `TRABAJO_FINAL_ORGANIZACION.md` para matriz RACI detallada.

### 7.3 Herramientas y Licencias

| Herramienta | Versión | Licencia | Propósito |
|-------------|---------|----------|-----------|
| Jest | 29.x | MIT | Unit testing |
| Playwright | 1.x | Apache 2.0 | E2E testing |
| K6 | Latest | AGPL | Performance |
| OWASP ZAP | Latest | Apache 2.0 | Security |
| SonarCloud | Cloud | Free (Open Source) | Quality |

---

## 8. CRONOGRAMA

### Fase 1: Planificación (Días 1-2) ✅
- [x] Selección de aplicación
- [x] Definición de alcance
- [x] Diseño de estrategia
- [x] Configuración de herramientas

### Fase 2: Diseño (Días 3-4) ✅
- [x] Diseño de casos de prueba unitarios
- [x] Diseño de casos de prueba E2E
- [x] Diseño de escenarios de seguridad
- [x] Diseño de escenarios de performance

### Fase 3: Implementación (Días 5-7) ✅
- [x] Implementación de tests unitarios (219 tests)
- [x] Implementación de tests E2E (3 specs)
- [x] Configuración de OWASP ZAP
- [x] Configuración de K6
- [x] Setup CI/CD (10 workflows)

### Fase 4: Ejecución (Día 8) ✅
- [x] Ejecución automatizada vía CI/CD
- [x] Generación de reportes
- [x] Identificación de defectos

### Fase 5: Documentación (Días 8-9) ⚠️
- [ ] Documentación de casos de prueba
- [ ] Reportes de análisis
- [ ] Métricas consolidadas

### Fase 6: Cierre (Día 10) ⚠️
- [ ] Presentación final
- [ ] Entrega de documentación

---

## 9. RIESGOS Y MITIGACIONES

### 9.1 Riesgos Identificados

| ID | Riesgo | Probabilidad | Impacto | Mitigación |
|----|--------|--------------|---------|------------|
| R1 | Firebase quota exceeded | Baja | Alto | Usar emulator local |
| R2 | Vercel deployment fails | Media | Medio | Docker fallback |
| R3 | Tests flaky intermitentes | Media | Medio | Retry logic, timeouts |
| R4 | Falta de documentación | Alta | Alto | Templates predefinidos |
| R5 | Conocimiento concentrado en 1 persona | Alta | Alto | Pair programming, documentación |

### 9.2 Dependencias Externas

- Firebase (Auth, Firestore)
- Vercel (Deployment)
- GitHub (CI/CD, hosting)
- SonarCloud (Quality metrics)

---

## 10. MÉTRICAS DE CALIDAD

### 10.1 Métricas de Pruebas

| Métrica | Objetivo | Actual | Estado |
|---------|----------|--------|--------|
| **Tests Unitarios** | 200+ | 219 | ✅ PASS |
| **Cobertura de Código** | >80% | 88.28% | ✅ PASS |
| **Tests E2E** | 3+ | 3 | ✅ PASS |
| **Tasa de Éxito** | >95% | 100% | ✅ PASS |
| **Vulnerabilidades Críticas** | 0 | 0 | ✅ PASS |
| **Response Time p95** | <2s | 46ms | ✅ PASS |
| **Error Rate** | <5% | Variable* | ⚠️ REVIEW |

*Nota: Error rate varía según test K6 (ver `REPORTE_PERFORMANCE.md`)

### 10.2 Métricas de Calidad de Código (SonarCloud)

| Métrica | Valor |
|---------|-------|
| **Quality Gate** | ✅ PASSED |
| **Bugs** | 0 |
| **Vulnerabilities** | 0 |
| **Code Smells** | [Completar] |
| **Technical Debt** | [Completar] |
| **Duplications** | [Completar] |

### 10.3 KPIs del Proyecto

- **Defect Detection Rate:** [Completar]
- **Defect Leakage:** 0% (ningún bug en producción)
- **Test Automation Rate:** 100%
- **Build Success Rate:** >95%

---

## 11. GESTIÓN DE DEFECTOS

### 11.1 Proceso de Reporte

1. Identificación del defecto durante testing
2. Registro en `REPORTE_DEFECTOS.md`
3. Clasificación por severidad
4. Asignación para corrección
5. Verificación de fix
6. Cierre del defecto

### 11.2 Clasificación de Severidad

| Nivel | Descripción | Ejemplo |
|-------|-------------|---------|
| **Critical** | Bloquea funcionalidad principal | App crash, no se puede hacer login |
| **High** | Funcionalidad importante no funciona | Trading no procesa órdenes |
| **Medium** | Funcionalidad menor afectada | UI glitch, data delay |
| **Low** | Cosmético, no afecta funcionalidad | Typo, alineación |

### 11.3 Defectos Encontrados

Ver documento `REPORTE_DEFECTOS.md` para lista detallada.

**Resumen:**
- Critical: 0
- High: 0
- Medium: [Completar]
- Low: [Completar]

---

## 12. ENTREGABLES

### 12.1 Documentación
- [x] `PLAN_DE_PRUEBAS.md` (este documento)
- [ ] `REQUISITOS_Y_TRAZABILIDAD.md`
- [ ] `CASOS_PRUEBA_UNITARIAS.md`
- [ ] `CASOS_PRUEBA_E2E.md`
- [ ] `CASOS_PRUEBA_SISTEMA.md`
- [ ] `CASOS_PRUEBA_NO_FUNCIONALES.md`
- [ ] `REPORTE_EJECUTIVO.md`
- [ ] `REPORTE_SEGURIDAD.md`
- [ ] `REPORTE_PERFORMANCE.md`
- [ ] `REPORTE_DEFECTOS.md`
- [ ] `METRICAS_CALIDAD.md`

### 12.2 Código de Pruebas
- [x] 219 tests unitarios (Jest)
- [x] 3 specs E2E (Playwright)
- [x] Scripts K6 performance
- [x] Configuración OWASP ZAP

### 12.3 Reportes
- [x] Coverage Report HTML
- [x] CI/CD Dashboard
- [x] Security Reports (OWASP ZAP)
- [x] Performance Reports (K6)
- [x] SonarCloud Analysis

### 12.4 Presentación
- [ ] Diapositivas finales
- [ ] Demo en vivo
- [ ] Video explicativo (opcional)

---

## 13. APROBACIONES

| Rol | Nombre | Firma | Fecha |
|-----|--------|-------|-------|
| QA Lead | Persona 1 | | |
| Test Engineer | Persona 2 | | |
| Security Tester | Persona 3 | | |
| E2E Tester | Persona 4 | | |
| DevOps | Persona 5 | | |
| Instructor | [Nombre] | | |

---

## 14. REFERENCIAS

1. ISO/IEC/IEEE 29119 - Software Testing Standards
2. ISTQB Glossary - Testing Terminology
3. `README.md` - Project overview
4. `TESTING.md` - Testing guide
5. `TRABAJO_FINAL_ORGANIZACION.md` - Work organization

---

## 15. HISTORIAL DE CAMBIOS

| Versión | Fecha | Autor | Cambios |
|---------|-------|-------|---------|
| 1.0 | [Fecha] | Persona 1 | Versión inicial |

---

**Próxima Revisión:** [Fecha]  
**Estado del Documento:** BORRADOR / EN REVISIÓN / APROBADO
