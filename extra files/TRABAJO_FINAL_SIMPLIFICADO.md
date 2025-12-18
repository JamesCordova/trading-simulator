# 📚 Trabajo Final - Trading Simulator App (VERSIÓN SIMPLIFICADA)
## Laboratorio de Calidad de Software

**Equipo:** 5 estudiantes  
**Duración:** 10 días  
**Fecha:** [Completar]

---

## 🎯 VERSIÓN SIMPLIFICADA PARA ESTUDIANTES

### ¿Por qué simplificamos?

La versión original tenía **14+ documentos separados** que es excesivo para un proyecto académico de estudiantes. Esta versión consolidada es más realista y manejable.

---

## 📋 DOCUMENTACIÓN REQUERIDA (SOLO 3 ARCHIVOS)

### **Archivo 1: TRABAJO_FINAL.md (Documento Principal)**
**Responsable:** TODO EL EQUIPO (colaborativo)  
**Tiempo:** 1-2 días  
**Contenido consolidado:**

```
TRABAJO_FINAL.md (un solo archivo grande)
├─ 1. Introducción y Alcance
├─ 2. Plan de Pruebas
│  ├─ Objetivos
│  ├─ Estrategia por niveles
│  └─ Herramientas
├─ 3. Requisitos y Trazabilidad
│  ├─ Requisitos funcionales (lista simple)
│  ├─ Requisitos no funcionales
│  └─ Matriz de trazabilidad (tabla)
├─ 4. Casos de Prueba
│  ├─ Unit Tests (resumen)
│  ├─ E2E Tests (resumen)
│  ├─ Security Tests (resumen)
│  └─ Performance Tests (resumen)
├─ 5. Resultados de Ejecución
│  ├─ Métricas alcanzadas
│  ├─ Defectos encontrados (si hay)
│  └─ Capturas de pantalla de reportes
├─ 6. Conclusiones
│  ├─ Lecciones aprendidas
│  └─ Recomendaciones
└─ 7. Anexos
   └─ Links a reportes online
```

**División de trabajo:**
- Persona 1: Introducción, Plan, Conclusiones (secciones 1, 2, 6)
- Persona 2: Requisitos, Casos Unit (secciones 3, 4.1)
- Persona 3: Casos Security/Perf (secciones 4.3, 4.4)
- Persona 4: Casos E2E (sección 4.2)
- Persona 5: Resultados, Métricas, Anexos (sección 5, 7)

---

### **Archivo 2: MANUAL_USUARIO.md (Guía Práctica)**
**Responsable:** Persona 2 (con ayuda de todos)  
**Tiempo:** 2-3 horas  
**Contenido:**

```
MANUAL_USUARIO.md
├─ Setup inicial (instalación)
├─ Cómo ejecutar tests
│  ├─ npm test (Unit)
│  ├─ npm run test:e2e (E2E)
│  └─ K6 y OWASP (opcional)
├─ Ver reportes
├─ Troubleshooting común
└─ Cheat sheet de comandos
```

**Nota:** Este archivo YA ESTÁ CREADO como `MANUAL_EJECUCION_TESTS.md` - solo necesita revisión.

---

### **Archivo 3: PRESENTACION_FINAL.pptx (Diapositivas)**
**Responsable:** TODO EL EQUIPO (cada uno sus slides)  
**Tiempo:** 2-3 horas  
**Estructura:**

```
Presentación (15-20 slides total)
├─ Slides 1-3: Introducción (Persona 1)
│  ├─ Título y equipo
│  ├─ Alcance del proyecto
│  └─ Objetivos
├─ Slides 4-6: Estrategia de Pruebas (Persona 1)
│  ├─ Metodología
│  ├─ Herramientas
│  └─ Pipeline CI/CD
├─ Slides 7-9: Pruebas Unitarias (Persona 2)
│  ├─ 219 tests, 88% cobertura
│  ├─ Capturas de reportes
│  └─ Ejemplo de test
├─ Slides 10-12: Seguridad y Performance (Persona 3)
│  ├─ OWASP ZAP (0 vulnerabilidades críticas)
│  ├─ K6 (50 usuarios, 46ms p95)
│  └─ Capturas de reportes
├─ Slides 13-14: Pruebas E2E (Persona 4)
│  ├─ Playwright (3 specs, 15 escenarios)
│  ├─ Capturas de ejecución
│  └─ Demo en vivo
├─ Slides 15-17: Resultados (Persona 5)
│  ├─ Métricas consolidadas
│  ├─ Quality Gate PASSED
│  └─ Dashboard CI/CD
├─ Slides 18-20: Conclusiones (TODO EL EQUIPO)
│  ├─ Lecciones aprendidas
│  ├─ Q&A
│  └─ Créditos
```

---

## 📅 CRONOGRAMA SIMPLIFICADO

### **Día 8: Documentación Consolidada**

**Mañana (4 horas):**
- **9:00-10:00** → Reunión de equipo: Revisar estructura del documento
- **10:00-13:00** → Cada persona trabaja en su sección del TRABAJO_FINAL.md

**Tarde (4 horas):**
- **14:00-16:00** → Continuar trabajando en secciones asignadas
- **16:00-17:00** → Persona 2 revisa/actualiza MANUAL_USUARIO.md
- **17:00-18:00** → Revisión cruzada, integrar todas las secciones

### **Día 9: Presentación y Ajustes**

**Mañana (4 horas):**
- **9:00-10:00** → Cada persona crea sus slides (3-4 slides c/u)
- **10:00-12:00** → Integrar presentación, unificar diseño
- **12:00-13:00** → Primera práctica de presentación

**Tarde (4 horas):**
- **14:00-15:00** → Ajustes finales al documento
- **15:00-16:00** → Preparar demo en vivo
- **16:00-17:00** → Ensayo completo con tiempos
- **17:00-18:00** → Últimos ajustes

### **Día 10: Presentación Final**

**Mañana (2 horas):**
- **9:00-10:00** → Ensayo final
- **10:00-11:00** → Preparar equipo, verificar demos

**Tarde:**
- **[Hora TBD]** → **PRESENTACIÓN FINAL** 🎯

---

## 👥 DIVISIÓN DE TRABAJO DETALLADA

### Persona 1 (QA Lead) - Tiempo: 6-8 horas
**TRABAJO_FINAL.md:**
- [ ] Sección 1: Introducción (1h)
  - Descripción del proyecto
  - Objetivos del plan de pruebas
  - Alcance
  
- [ ] Sección 2: Plan de Pruebas (2h)
  - Estrategia por niveles (Unit, E2E, Security, Perf)
  - Herramientas utilizadas
  - Cronograma ejecutado
  
- [ ] Sección 6: Conclusiones (1h)
  - Objetivos cumplidos
  - Lecciones aprendidas
  - Recomendaciones

**PRESENTACION_FINAL.pptx:**
- [ ] Slides 1-6: Intro + Estrategia (2h)

**Tiempo estimado: 6 horas**

---

### Persona 2 (Test Engineer) - Tiempo: 6-8 horas
**TRABAJO_FINAL.md:**
- [ ] Sección 3: Requisitos (1h)
  - Lista de requisitos funcionales (14)
  - Lista de requisitos no funcionales (12)
  - Matriz de trazabilidad simple
  
- [ ] Sección 4.1: Casos Prueba Unitarias (2h)
  - Resumen de 219 tests
  - 5-10 casos de prueba ejemplo (formato simple)
  - Cobertura 88.28%

**MANUAL_USUARIO.md:**
- [ ] Revisar y actualizar (1h)

**PRESENTACION_FINAL.pptx:**
- [ ] Slides 7-9: Unit Tests (2h)

**Tiempo estimado: 6 horas**

---

### Persona 3 (Security/Perf) - Tiempo: 6-8 horas
**TRABAJO_FINAL.md:**
- [ ] Sección 4.3: Casos Prueba Seguridad (2h)
  - OWASP ZAP configuración
  - Vulnerabilidades buscadas
  - Resultados: 0 críticas
  - 3-5 casos ejemplo
  
- [ ] Sección 4.4: Casos Prueba Performance (2h)
  - K6 configuración
  - Escenarios de carga
  - Resultados: 46ms p95, 50 usuarios
  - 3-5 casos ejemplo

**PRESENTACION_FINAL.pptx:**
- [ ] Slides 10-12: Security & Performance (2h)

**Tiempo estimado: 6 horas**

---

### Persona 4 (E2E Tester) - Tiempo: 6-8 horas
**TRABAJO_FINAL.md:**
- [ ] Sección 4.2: Casos Prueba E2E (3h)
  - Playwright configuración
  - 3 specs: auth, dashboard, trading
  - 15 escenarios
  - 5-10 casos ejemplo detallados

**PRESENTACION_FINAL.pptx:**
- [ ] Slides 13-14: E2E Tests (2h)
- [ ] Preparar demo en vivo (1h)

**Tiempo estimado: 6 horas**

---

### Persona 5 (DevOps/Metrics) - Tiempo: 6-8 horas
**TRABAJO_FINAL.md:**
- [ ] Sección 5: Resultados (3h)
  - Tabla de métricas alcanzadas
  - SonarCloud Quality Gate
  - Defectos encontrados (si hay)
  - Capturas de pantalla de reportes
  
- [ ] Sección 7: Anexos (30min)
  - Links a reportes online
  - Referencias

**PRESENTACION_FINAL.pptx:**
- [ ] Slides 15-17: Resultados y Métricas (2h)
- [ ] Slide 20: Créditos y cierre (30min)

**Tiempo estimado: 6 horas**

---

### TODO EL EQUIPO - Tiempo: 4-6 horas
- [ ] Slide 18-19: Conclusiones colaborativas (1h)
- [ ] Revisión cruzada de TRABAJO_FINAL.md (1h)
- [ ] Integración de presentación (1h)
- [ ] Ensayos (2-3h)

---

## 📊 COMPARACIÓN: Antes vs Después

### ❌ Versión Original (Demasiado Compleja)
- **14+ documentos separados**
- **80+ KB de documentación**
- **Tiempo estimado: 15-20 horas por persona**
- **Poco realista para estudiantes**

### ✅ Versión Simplificada (Realista)
- **3 archivos principales**
- **1 documento consolidado + 1 manual + presentación**
- **Tiempo estimado: 6-8 horas por persona**
- **Manejable y profesional**

---

## 🎯 PLANTILLA DEL DOCUMENTO PRINCIPAL

### Estructura Sugerida para TRABAJO_FINAL.md

```markdown
# Trabajo Final - Trading Simulator App
## Laboratorio de Calidad de Software

**Equipo:**
- Persona 1 - QA Lead
- Persona 2 - Test Engineer
- Persona 3 - Security/Performance Tester
- Persona 4 - E2E Tester
- Persona 5 - DevOps/Metrics

**Fecha:** [Completar]

---

## 1. INTRODUCCIÓN

### 1.1 Descripción del Proyecto
[Persona 1 - 1 párrafo]

### 1.2 Objetivos del Plan de Pruebas
[Persona 1 - Lista de 5-6 objetivos]

### 1.3 Alcance
[Persona 1 - Qué se prueba y qué no]

---

## 2. PLAN DE PRUEBAS

### 2.1 Estrategia de Pruebas
[Persona 1 - Pirámide de pruebas, niveles]

### 2.2 Herramientas Utilizadas
[Persona 1 - Tabla de herramientas]

### 2.3 Ambientes de Prueba
[Persona 1 - Local, CI/CD, Producción]

---

## 3. REQUISITOS Y TRAZABILIDAD

### 3.1 Requisitos Funcionales
[Persona 2 - Lista numerada de 14 requisitos]

### 3.2 Requisitos No Funcionales
[Persona 2 - Lista numerada de 12 requisitos]

### 3.3 Matriz de Trazabilidad
[Persona 2 - Tabla: Requisito → Test → Estado]

---

## 4. CASOS DE PRUEBA

### 4.1 Pruebas Unitarias (Jest)
[Persona 2 - Resumen + 5-10 casos ejemplo]

**Métricas:**
- Total tests: 219
- Cobertura: 88.28%
- Estado: ✅ 100% passing

**Ejemplos de Casos:**
- TC-001: Test de componente Analytics
- TC-002: Test de autenticación
- [etc...]

### 4.2 Pruebas E2E (Playwright)
[Persona 4 - Resumen + 5-10 casos ejemplo]

**Métricas:**
- Total specs: 3
- Total escenarios: 15
- Estado: ✅ 100% passing

**Ejemplos de Casos:**
- TC-E2E-001: Login flow
- TC-E2E-002: Trading operation
- [etc...]

### 4.3 Pruebas de Seguridad (OWASP ZAP)
[Persona 3 - Resumen + casos ejemplo]

**Métricas:**
- Vulnerabilidades críticas: 0
- Security Rating: A

### 4.4 Pruebas de Rendimiento (K6)
[Persona 3 - Resumen + casos ejemplo]

**Métricas:**
- Response time p95: 46ms
- Max concurrent users: 50

---

## 5. RESULTADOS

### 5.1 Métricas Consolidadas
[Persona 5 - Tabla con todas las métricas]

### 5.2 Capturas de Reportes
[Persona 5 - Screenshots de dashboards]

### 5.3 Defectos Encontrados
[Persona 5 - Tabla de bugs si hay]

---

## 6. CONCLUSIONES

### 6.1 Objetivos Cumplidos
[Persona 1 - Lista de checkmarks]

### 6.2 Lecciones Aprendidas
[Persona 1 - 3-5 puntos]

### 6.3 Recomendaciones
[Persona 1 - 3-5 puntos]

---

## 7. ANEXOS

### 7.1 Enlaces a Reportes Online
[Persona 5 - Lista de links]

### 7.2 Referencias
[Persona 5 - Bibliografía]
```

---

## ✅ CHECKLIST FINAL

### Antes de la Entrega:
- [ ] TRABAJO_FINAL.md completo (todas las secciones)
- [ ] MANUAL_USUARIO.md revisado
- [ ] PRESENTACION_FINAL.pptx integrada
- [ ] Todas las capturas de pantalla incluidas
- [ ] Links a reportes online verificados
- [ ] Revisión ortográfica
- [ ] Ensayo de presentación realizado

### Durante la Presentación:
- [ ] Cada persona presenta su parte (3-5 min)
- [ ] Demo en vivo funciona
- [ ] Q&A preparado

---

## 💡 TIPS PARA ESTUDIANTES

1. **No se estresen:** 3 archivos es manejable
2. **Trabajen en paralelo:** Usen Google Docs para colaborar en tiempo real
3. **Reutilicen:** Copien/peguen de los README existentes
4. **Screenshots:** Tomen capturas de los reportes online
5. **Prioricen:** Si falta tiempo, enfóquense en TRABAJO_FINAL.md y presentación

---

**¡Mucho éxito! 🚀**
