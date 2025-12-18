# 📚 Organización del Trabajo Final - Trading Simulator App
## Laboratorio de Calidad de Software

**Equipo:** 5 estudiantes  
**Duración:** 10 días de trabajo efectivo  
**Aplicación:** Trading Simulator (Next.js + Firebase)

---

## 📋 ÍNDICE

1. [División Teórica Ideal](#división-teórica-ideal-5-personas)
2. [División Real - Tareas Pendientes](#división-real---tareas-pendientes)
3. [Cronograma de Trabajo](#cronograma-de-trabajo)
4. [Documentación a Entregar](#documentación-a-entregar)
5. [Distribución de Responsabilidades](#distribución-de-responsabilidades)

---

## 🎯 DIVISIÓN TEÓRICA IDEAL (5 Personas)

### Como si todos hubieran trabajado desde el inicio

### **Persona 1: Project Manager & QA Lead**
**Responsabilidades Teóricas:**
- ✅ Definición del alcance del proyecto
- ✅ Planificación inicial del plan de pruebas
- ✅ Estrategia de testing (niveles, tipos, ambientes)
- ✅ Coordinación del equipo
- ✅ Documentación del Plan de Pruebas maestro
- ✅ Integración CI/CD con GitHub Actions

**Artefactos Teóricos:**
- `TESTING_PLAN.md` - Plan maestro de pruebas
- `README.md` - Documentación principal
- Configuración de workflows (10 archivos .yml)
- Dashboard CI/CD

**Tiempo estimado:** 2-3 días

---

### **Persona 2: Test Automation Engineer (Unit & Integration)**
**Responsabilidades Teóricas:**
- ✅ Diseño e implementación de pruebas unitarias (Jest)
- ✅ Configuración de cobertura de código
- ✅ Pruebas de componentes React
- ✅ Integración con SonarCloud
- ✅ Mocks y fixtures para Firebase

**Artefactos Teóricos:**
- 29 archivos de código (componentes + tests)
- `jest.config.js`, `jest.setup.js`
- 15+ archivos de test (`*.test.js`, `*.test.jsx`)
- 88.28% de cobertura de código
- 219 tests unitarios

**Tiempo estimado:** 3-4 días

---

### **Persona 3: Security & Performance Testing Specialist**
**Responsabilidades Teóricas:**
- ✅ Implementación de OWASP ZAP DAST
- ✅ Configuración de K6 Performance Testing
- ✅ Lighthouse para métricas web
- ✅ Análisis de vulnerabilidades
- ✅ Optimización de performance

**Artefactos Teóricos:**
- `k6/performance-test.js`
- `OWASP_ZAP.md` (9.7 KB)
- `K6_PERFORMANCE.md` (7.1 KB)
- `LIGHTHOUSE.md` (6 KB)
- Workflows: `owasp-zap.yml`, `k6-performance.yml`, `lighthouse.yml`
- Scripts de generación de reportes

**Tiempo estimado:** 2-3 días

---

### **Persona 4: E2E Testing Engineer**
**Responsabilidades Teóricas:**
- ✅ Implementación de Playwright E2E
- ✅ Diseño de casos de prueba de sistema
- ✅ Pruebas de flujos completos de usuario
- ✅ Configuración de ambientes de prueba
- ✅ Datos de prueba y fixtures

**Artefactos Teóricos:**
- `e2e/` folder (3 archivos de specs)
- `e2e/fixtures/mockData.ts`
- `playwright.config.ts`
- `PLAYWRIGHT.md` (9 KB)
- Workflow: `playwright.yml`

**Tiempo estimado:** 2-3 días

---

### **Persona 5: DevOps & Infrastructure**
**Responsabilidades Teóricas:**
- ✅ Configuración Docker y Kubernetes
- ✅ Deployment automatizado (Vercel)
- ✅ Publicación de reportes (GitHub Pages)
- ✅ Configuración de Firebase
- ✅ Infraestructura CI/CD

**Artefactos Teóricos:**
- `Dockerfile`, `.dockerignore`
- `DEPLOYMENT.md` (8 KB)
- `firebase.json`, `firestore.rules`
- Workflows: `docker-deploy.yml`, `vercel-deploy.yml`, `publish-reports.yml`
- Scripts de deployment

**Tiempo estimado:** 2 días

---

## 🚀 DIVISIÓN REAL - TAREAS PENDIENTES

### Lo que REALMENTE falta por hacer (para completar el trabajo)

---

### **👤 Persona 1: Introducción, Plan y Conclusiones**
**Tiempo estimado:** 6-8 horas

#### Tareas Pendientes:
**En TRABAJO_FINAL.md (documento consolidado):**

1. **Sección 1: Introducción** (1 hora)
   - [ ] Descripción del proyecto
   - [ ] Objetivos del plan de pruebas
   - [ ] Alcance (qué se prueba y qué no)

2. **Sección 2: Plan de Pruebas** (2 horas)
   - [ ] Estrategia por niveles (Unit, E2E, Security, Performance)
   - [ ] Herramientas utilizadas (tabla simple)
   - [ ] Ambientes de prueba
   - [ ] Cronograma ejecutado

3. **Sección 6: Conclusiones** (1 hora)
   - [ ] Objetivos cumplidos (checklist)
   - [ ] Lecciones aprendidas (3-5 puntos)
   - [ ] Recomendaciones futuras (3-5 puntos)

**En PRESENTACION_FINAL.pptx:**
- [ ] Slides 1-6: Introducción + Estrategia (2 horas)

**Entregables:**
- Secciones 1, 2, 6 de `TRABAJO_FINAL.md`
- Slides introductorios de presentación

---

### **👤 Persona 2: Requisitos y Pruebas Unitarias**
**Tiempo estimado:** 6-8 horas

#### Tareas Pendientes:
**En TRABAJO_FINAL.md:**

1. **Sección 3: Requisitos y Trazabilidad** (1 hora)
   - [ ] Lista de requisitos funcionales (14 items)
   - [ ] Lista de requisitos no funcionales (12 items)
   - [ ] Matriz de trazabilidad simple (tabla)

2. **Sección 4.1: Casos de Prueba Unitarias** (2 horas)
   - [ ] Resumen de 219 tests implementados
   - [ ] 5-10 casos de prueba ejemplo (formato simple)
   - [ ] Métricas: 88.28% cobertura
   - [ ] Herramientas: Jest + React Testing Library

**MANUAL_USUARIO.md:**
- [ ] Revisar y actualizar (1 hora)
  - Ya existe como `MANUAL_EJECUCION_TESTS.md`
  - Solo requiere revisión y ajustes menores

**En PRESENTACION_FINAL.pptx:**
- [ ] Slides 7-9: Pruebas Unitarias (2 horas)

**Entregables:**
- Secciones 3 y 4.1 de `TRABAJO_FINAL.md`
- `MANUAL_USUARIO.md` (revisión)
- Slides de unit tests

---

### **👤 Persona 3: Seguridad y Performance**
**Tiempo estimado:** 6-8 horas

#### Tareas Pendientes:
**En TRABAJO_FINAL.md:**

1. **Sección 4.3: Casos de Prueba de Seguridad** (2 horas)
   - [ ] Configuración OWASP ZAP
   - [ ] Vulnerabilidades buscadas (OWASP Top 10)
   - [ ] Resultados: 0 vulnerabilidades críticas
   - [ ] 3-5 casos de prueba ejemplo
   - [ ] Security Rating: A

2. **Sección 4.4: Casos de Prueba de Performance** (2 horas)
   - [ ] Configuración K6
   - [ ] Escenarios de carga (20, 50 usuarios)
   - [ ] Resultados: 46ms p95, <5% error rate
   - [ ] 3-5 casos de prueba ejemplo
   - [ ] Métricas alcanzadas vs objetivos

**En PRESENTACION_FINAL.pptx:**
- [ ] Slides 10-12: Security & Performance (2 horas)
  - Capturas de reportes OWASP ZAP
  - Capturas de reportes K6
  - Gráficos de métricas

**Entregables:**
- Secciones 4.3 y 4.4 de `TRABAJO_FINAL.md`
- Slides de security/performance

---

### **👤 Persona 4: Pruebas E2E**
**Tiempo estimado:** 6-8 horas

#### Tareas Pendientes:
**En TRABAJO_FINAL.md:**

1. **Sección 4.2: Casos de Prueba E2E** (3 horas)
   - [ ] Configuración Playwright
   - [ ] 3 specs implementadas: auth, dashboard, trading
   - [ ] 15 escenarios de prueba
   - [ ] 5-10 casos de prueba ejemplo detallados
   - [ ] Capturas de pantalla de ejecución
   - [ ] Flujos de usuario end-to-end

**En PRESENTACION_FINAL.pptx:**
- [ ] Slides 13-14: Pruebas E2E (2 horas)
  - Screenshots de Playwright
  - Video o demo de tests corriendo
  
**Preparar Demo en Vivo:**
- [ ] Preparar demo de Playwright UI mode (1 hora)
- [ ] Ensayo de demo (30 min)

**Entregables:**
- Sección 4.2 de `TRABAJO_FINAL.md`
- Slides de E2E tests
- Demo en vivo preparada

---

### **👤 Persona 5: Resultados y Métricas**
**Tiempo estimado:** 6-8 horas

#### Tareas Pendientes:
**En TRABAJO_FINAL.md:**

1. **Sección 5: Resultados de Ejecución** (3 horas)
   - [ ] Tabla consolidada de métricas alcanzadas vs objetivos
   - [ ] SonarCloud Quality Gate: PASSED
   - [ ] Capturas de pantalla de todos los reportes:
     - Coverage Report (88.28%)
     - CI/CD Dashboard
     - OWASP ZAP (0 críticas)
     - K6 Performance (46ms p95)
     - Playwright results
   - [ ] Defectos encontrados (si hay alguno, sino poner 0)
   - [ ] Análisis de resultados

2. **Sección 7: Anexos** (30 min)
   - [ ] Links a reportes online (GitHub Pages)
   - [ ] Referencias y bibliografía

**En PRESENTACION_FINAL.pptx:**
- [ ] Slides 15-17: Resultados y Métricas (2 horas)
  - Dashboard CI/CD
  - Gráficos de métricas
  - Comparativa de objetivos
- [ ] Slide 20: Créditos y cierre (30 min)

**Entregables:**
- Secciones 5 y 7 de `TRABAJO_FINAL.md`
- Slides de resultados/métricas
- Slide de cierre

---

### **👥 TODO EL EQUIPO: Presentación Final**
**Tiempo estimado:** 2-3 horas (colaborativo)

#### Tareas Pendientes:
1. **Creación de Presentación** (2-3 horas - TODOS)
   - [ ] Persona 1: Slides de introducción, alcance y estrategia
   - [ ] Persona 2: Slides de pruebas unitarias y cobertura
   - [ ] Persona 3: Slides de seguridad y performance
   - [ ] Persona 4: Slides de pruebas E2E y sistema
   - [ ] Persona 5: Slides de métricas y conclusiones
   - [ ] TODOS: Revisión y ajustes finales

2. **Preparación de Demo** (1 hora - TODOS)
   - [ ] Ensayo de presentación
   - [ ] Demostración en vivo de tests
   - [ ] Mostrar reportes publicados
   - [ ] Q&A practice

3. **Distribución de Secciones para Presentar**
   - Persona 1: Introducción y estrategia (5 min)
   - Persona 2: Pruebas unitarias (3 min)
   - Persona 3: Seguridad y performance (3 min)
   - Persona 4: Pruebas E2E (3 min)
   - Persona 5: Métricas y conclusiones (3 min)
   - TODOS: Q&A (3 min)

**Entregables:**
- `PRESENTACION_FINAL.pptx` (o Google Slides) - **COLABORATIVO**

---

## 📅 CRONOGRAMA DE TRABAJO

### Días 1-2: Planificación y Diseño (Ya completado ✅)
- ✅ Selección de aplicación
- ✅ Revisión de requisitos
- ✅ Definición de alcance
- ✅ Diseño de estrategia

### Días 3-7: Implementación (Ya completado ✅)
- ✅ Pruebas unitarias automatizadas (219 tests)
- ✅ Pruebas E2E con Playwright (3 specs)
- ✅ Pruebas de seguridad OWASP ZAP
- ✅ Pruebas de performance K6
- ✅ Configuración CI/CD (10 workflows)

### **Días 8-9: DOCUMENTACIÓN (PENDIENTE) ⚠️**

#### **Día 8: Documentación Técnica**
**Mañana (4 horas):**
- Persona 1: Plan de Pruebas + Requisitos (3h)
- Persona 2: Casos de Prueba Unitarios (2h)
- Persona 3: Reporte de Seguridad (2h)
- Persona 4: Casos de Prueba E2E (2h)
- Persona 5: Métricas de Calidad (2h)

**Tarde (4 horas):**
- Persona 1: Reporte Ejecutivo (2h)
- Persona 2: Análisis de Cobertura (2h)
- Persona 3: Reporte de Performance (2h)
- Persona 4: Casos de Prueba Sistema (2h)
- Persona 5: Infraestructura (2h)

#### **Día 9: Finalización y Revisión**
**Mañana (4 horas):**
- Persona 1: Revisión general de documentos
- Persona 2: Manual de Ejecución
- Persona 3: Casos No Funcionales
- Persona 4: Reporte de Defectos
- Persona 5: Métricas e Infraestructura

**Tarde (4 horas):**
- **TODO EL EQUIPO:** Revisión cruzada de documentos
- **TODO EL EQUIPO:** Inicio de presentación (cada uno prepara sus slides)
- Correcciones y ajustes
- Consolidación de entregables

### **Día 10: Presentación Final (PENDIENTE) ⚠️**

**Mañana (4 horas):**
- **TODO EL EQUIPO:** Finalizar presentación colaborativa
- **TODO EL EQUIPO:** Ensayo completo de presentación
- **TODO EL EQUIPO:** Preparar demostración en vivo
- Asignar tiempos y transiciones

**Tarde:**
- **PRESENTACIÓN FINAL** 🎯

---

## 📦 DOCUMENTACIÓN A ENTREGAR

### 1. Documentos Obligatorios del Curso

#### ✅ Ya Existentes (parcialmente):
- [x] `README.md` - Documentación general
- [x] `TESTING.md` - Guía de testing
- [x] `DEPLOYMENT.md` - Deployment
- [x] `K6_PERFORMANCE.md` - Performance
- [x] `OWASP_ZAP.md` - Seguridad
- [x] `PLAYWRIGHT.md` - E2E
- [x] `LIGHTHOUSE.md` - Métricas web

#### ⚠️ Pendientes de Crear (SIMPLIFICADO):
- [ ] `TRABAJO_FINAL.md` - **DOCUMENTO PRINCIPAL (TODO EN UNO)**
  - Incluye: Plan, Requisitos, Casos de Prueba, Resultados
- [ ] `MANUAL_USUARIO.md` - **Guía práctica de ejecución**
- [ ] `PRESENTACION_FINAL.pptx` - **Diapositivas del equipo**

**NOTA:** En lugar de 14+ documentos separados, consolidamos todo en 2-3 archivos principales más manejables para estudiantes.

### 2. Evidencias de Ejecución

#### ✅ Ya Disponibles:
- [x] Reportes HTML publicados en GitHub Pages
- [x] Coverage Report (88.28%)
- [x] CI/CD Dashboard
- [x] SonarCloud metrics
- [x] OWASP ZAP reports
- [x] K6 performance reports
- [x] Playwright test reports
- [x] GitHub Actions logs

---

## 👥 DISTRIBUCIÓN DE RESPONSABILIDADES

### Matriz de Responsabilidades (RACI)

| Documento/Tarea | P1 | P2 | P3 | P4 | P5 |
|-----------------|----|----|----|----|----| 
| Plan de Pruebas | **R** | C | C | C | I |
| Requisitos y Trazabilidad | **R** | C | I | I | I |
| Reporte Ejecutivo | **R** | C | C | C | C |
| Casos Prueba Unitarias | I | **R** | I | I | I |
| Análisis Cobertura | I | **R** | I | I | C |
| Manual Ejecución | I | **R** | C | C | C |
| Reporte Seguridad | I | I | **R** | I | C |
| Reporte Performance | I | I | **R** | I | C |
| Casos No Funcionales | I | I | **R** | C | I |
| Casos Prueba E2E | I | C | I | **R** | I |
| Casos Prueba Sistema | I | C | I | **R** | I |
| Reporte Defectos | C | C | C | **R** | I |
| Métricas Calidad | C | C | C | C | **R** |
| Infraestructura | I | I | C | I | **R** |
| Presentación Final | **R** | **R** | **R** | **R** | **R** |

**Leyenda:**
- **R** = Responsible (Responsable de crear)
- **C** = Consulted (Debe revisar y aportar)
- **I** = Informed (Debe estar informado)

---

## 🎯 MÉTRICAS DEL PROYECTO (Estado Actual)

### Cobertura de Pruebas
- ✅ **219 tests unitarios** implementados
- ✅ **88.28% cobertura de código**
- ✅ **3 specs E2E** (Playwright)
- ✅ **100% pruebas automatizadas**

### Infraestructura
- ✅ **10 workflows CI/CD** configurados
- ✅ **29 archivos de código** con tests
- ✅ **7 tipos de pruebas** diferentes
- ✅ **4 reportes públicos** en GitHub Pages

### Calidad
- ✅ **Quality Gate: PASSED** (SonarCloud)
- ✅ **0 bugs críticos**
- ✅ **Security Rating: A**
- ✅ **Maintainability: A**

---

## 📚 RECURSOS Y BIBLIOGRAFÍA

### Referencias Utilizadas:
1. ISO/IEC/IEEE 29119 - Software Testing Standards
2. ISTQB Glossary - Testing terminology
3. Jest Documentation - https://jestjs.io/
4. Playwright Documentation - https://playwright.dev/
5. K6 Documentation - https://k6.io/docs/
6. OWASP Testing Guide - https://owasp.org/
7. Firebase Documentation - https://firebase.google.com/docs

### Herramientas Utilizadas:
- **Testing:** Jest, Playwright, K6, OWASP ZAP
- **CI/CD:** GitHub Actions
- **Quality:** SonarCloud, Lighthouse
- **Deployment:** Vercel, Docker
- **Version Control:** Git, GitHub

---

## 🎓 LECCIONES APRENDIDAS

### Lo que funcionó bien ✅:
1. Automatización completa del pipeline CI/CD
2. Alta cobertura de código (88.28%)
3. Múltiples niveles de pruebas implementados
4. Reportes publicados y accesibles
5. Integración con herramientas profesionales

### Áreas de mejora ⚠️:
1. Documentación formal insuficiente
2. Falta de matriz de trazabilidad
3. Log de defectos no estructurado
4. Presentación final pendiente
5. División de trabajo desigual (1 persona hizo todo)

### Recomendaciones para futuros proyectos:
1. Documentar en paralelo con la implementación
2. Asignar roles desde el día 1
3. Revisiones periódicas de avance
4. Usar plantillas de documentación
5. Pair programming para transferencia de conocimiento

---

## 🚦 ESTADO ACTUAL Y PRÓXIMOS PASOS

### ✅ Completado (Días 1-7):
- Implementación técnica al 100%
- Infraestructura CI/CD funcionando
- Pruebas automatizadas ejecutándose
- Reportes siendo generados

### ⚠️ Pendiente (Días 8-10):
- **Documentación formal** (14 documentos)
- **Revisión cruzada** de entregables
- **Presentación final** con demos
- **Consolidación** de todo el trabajo

### 🎯 Objetivo Final:
Entregar un trabajo completo que demuestre:
1. Comprensión del ciclo de vida de pruebas
2. Implementación práctica de múltiples tipos de testing
3. Uso de herramientas profesionales
4. Documentación académica formal
5. Capacidad de trabajo en equipo (aunque sea teórico)

---

**Fecha de entrega:** [A definir según cronograma del curso]  
**Última actualización:** ${new Date().toLocaleDateString('es-ES')}

