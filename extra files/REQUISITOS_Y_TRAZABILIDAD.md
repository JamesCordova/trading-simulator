# 📝 Requisitos y Matriz de Trazabilidad
## Trading Simulator App

**Responsable:** Persona 1  
**Versión:** 1.0  
**Fecha:** [Completar]

---

## 1. REQUISITOS FUNCIONALES

### RF-01: Autenticación de Usuarios

**Prioridad:** Alta  
**Módulo:** Autenticación

#### RF-01.1: Registro de Usuario
- El sistema debe permitir el registro de nuevos usuarios
- Debe validar email único
- Debe requerir contraseña segura (mínimo 6 caracteres)
- Debe almacenar el nombre de usuario (displayName)
- **Criterio de aceptación:** Usuario puede registrarse exitosamente

#### RF-01.2: Inicio de Sesión
- El sistema debe permitir login con email y contraseña
- Debe validar credenciales contra Firebase Auth
- Debe crear sesión persistente
- **Criterio de aceptación:** Usuario puede hacer login y acceder al dashboard

#### RF-01.3: Cierre de Sesión
- El sistema debe permitir logout
- Debe limpiar sesión del usuario
- Debe redirigir a página principal
- **Criterio de aceptación:** Usuario puede cerrar sesión correctamente

### RF-02: Dashboard

**Prioridad:** Alta  
**Módulo:** Dashboard

#### RF-02.1: Visualización de Portfolio
- El sistema debe mostrar el portfolio del usuario
- Debe calcular el valor total
- Debe mostrar P&L (ganancia/pérdida)
- **Criterio de aceptación:** Usuario ve su portfolio actualizado

#### RF-02.2: Resumen de Inversiones
- El sistema debe mostrar resumen de inversiones
- Debe incluir gráficos de rendimiento
- Debe mostrar distribución de assets
- **Criterio de aceptación:** Usuario ve resumen visual de inversiones

### RF-03: Trading

**Prioridad:** Alta  
**Módulo:** Trading

#### RF-03.1: Búsqueda de Acciones
- El sistema debe permitir buscar acciones por símbolo/nombre
- Debe mostrar información de la acción
- Debe mostrar precio actual
- **Criterio de aceptación:** Usuario puede buscar y ver información de acciones

#### RF-03.2: Compra de Acciones
- El sistema debe permitir comprar acciones
- Debe validar fondos disponibles
- Debe actualizar portfolio
- Debe registrar transacción
- **Criterio de aceptación:** Usuario puede comprar acciones exitosamente

#### RF-03.3: Venta de Acciones
- El sistema debe permitir vender acciones
- Debe validar posesión de acciones
- Debe actualizar portfolio
- Debe registrar transacción
- **Criterio de aceptación:** Usuario puede vender acciones que posee

#### RF-03.4: Historial de Órdenes
- El sistema debe mostrar historial de transacciones
- Debe incluir fecha, tipo, cantidad, precio
- Debe permitir filtrado
- **Criterio de aceptación:** Usuario ve historial completo de órdenes

### RF-04: Portfolio

**Prioridad:** Media  
**Módulo:** Portfolio

#### RF-04.1: Visualización de Posiciones
- El sistema debe mostrar todas las posiciones activas
- Debe incluir cantidad, precio promedio, valor actual
- Debe calcular ganancia/pérdida por posición
- **Criterio de aceptación:** Usuario ve todas sus posiciones actualizadas

#### RF-04.2: Cálculo de Valor Total
- El sistema debe calcular valor total del portfolio
- Debe actualizar en tiempo real
- Debe incluir cash disponible
- **Criterio de aceptación:** Valor total se calcula correctamente

### RF-05: Watchlist

**Prioridad:** Baja  
**Módulo:** Watchlist

#### RF-05.1: Agregar a Watchlist
- El sistema debe permitir agregar acciones a watchlist
- Debe validar que no exista duplicado
- **Criterio de aceptación:** Usuario puede agregar acciones a watchlist

#### RF-05.2: Remover de Watchlist
- El sistema debe permitir eliminar acciones de watchlist
- **Criterio de aceptación:** Usuario puede remover acciones de watchlist

#### RF-05.3: Visualización de Watchlist
- El sistema debe mostrar watchlist con precios actualizados
- **Criterio de aceptación:** Usuario ve su watchlist actualizada

---

## 2. REQUISITOS NO FUNCIONALES

### RNF-01: Rendimiento

**Prioridad:** Alta

#### RNF-01.1: Tiempo de Respuesta
- El tiempo de carga inicial debe ser < 3 segundos
- El tiempo de respuesta p95 debe ser < 2 segundos
- Las operaciones de trading deben completarse < 1 segundo
- **Métrica:** K6 Performance Testing

#### RNF-01.2: Concurrencia
- El sistema debe soportar mínimo 50 usuarios concurrentes
- No debe degradarse con carga
- **Métrica:** K6 Load Testing

#### RNF-01.3: Throughput
- El sistema debe procesar mínimo 10 requests/segundo
- **Métrica:** K6 Metrics

### RNF-02: Seguridad

**Prioridad:** Crítica

#### RNF-02.1: Autenticación Segura
- Debe usar Firebase Authentication
- Passwords deben estar encriptados
- Sesiones deben expirar apropiadamente
- **Validación:** OWASP ZAP Security Scan

#### RNF-02.2: Protección contra Vulnerabilidades
- No debe tener vulnerabilidades OWASP Top 10
- Debe implementar security headers
- Debe proteger contra XSS
- Debe proteger contra CSRF
- **Validación:** OWASP ZAP DAST

#### RNF-02.3: HTTPS
- Toda comunicación debe ser sobre HTTPS
- Cookies deben ser secure
- **Validación:** Security Headers Check

### RNF-03: Usabilidad

**Prioridad:** Media

#### RNF-03.1: Accesibilidad
- Lighthouse Accessibility Score > 90
- Debe ser usable con teclado
- Debe tener contraste adecuado
- **Métrica:** Lighthouse Audit

#### RNF-03.2: Responsive Design
- Debe funcionar en desktop (>1024px)
- Debe funcionar en tablet (768-1024px)
- Debe funcionar en móvil (<768px)
- **Validación:** Visual Testing

#### RNF-03.3: Performance Web
- Lighthouse Performance Score > 90
- First Contentful Paint < 1.8s
- Time to Interactive < 3.8s
- **Métrica:** Lighthouse Core Web Vitals

### RNF-04: Mantenibilidad

**Prioridad:** Media

#### RNF-04.1: Calidad de Código
- SonarCloud Quality Gate debe pasar
- Code Smells < 50
- Duplicación < 3%
- **Métrica:** SonarCloud Analysis

#### RNF-04.2: Cobertura de Pruebas
- Cobertura de código > 80%
- Todos los componentes críticos deben tener tests
- **Métrica:** Jest Coverage Report

#### RNF-04.3: Documentación
- Código debe estar documentado
- README actualizado
- Guías de testing disponibles
- **Validación:** Code Review

### RNF-05: Disponibilidad

**Prioridad:** Media

#### RNF-05.1: Uptime
- Disponibilidad objetivo: 99%
- Deployment debe ser zero-downtime
- **Métrica:** Vercel Analytics

#### RNF-05.2: Recuperación ante Fallos
- Firebase tiene backup automático
- Rollback debe ser posible
- **Validación:** Deployment Testing

---

## 3. MATRIZ DE TRAZABILIDAD

### Requisitos → Casos de Prueba

| ID Requisito | Descripción | Prioridad | Casos de Prueba | Estado Testing |
|--------------|-------------|-----------|-----------------|----------------|
| **RF-01.1** | Registro de Usuario | Alta | TC-AUTH-001, TC-AUTH-002, TC-E2E-001 | ✅ PASS |
| **RF-01.2** | Inicio de Sesión | Alta | TC-AUTH-003, TC-AUTH-004, TC-E2E-002 | ✅ PASS |
| **RF-01.3** | Cierre de Sesión | Alta | TC-AUTH-005, TC-E2E-003 | ✅ PASS |
| **RF-02.1** | Visualización Portfolio | Alta | TC-PORT-001, TC-PORT-002, TC-E2E-004 | ✅ PASS |
| **RF-02.2** | Resumen Inversiones | Alta | TC-DASH-001, TC-DASH-002 | ✅ PASS |
| **RF-03.1** | Búsqueda Acciones | Alta | TC-TRAD-001, TC-TRAD-002, TC-E2E-005 | ✅ PASS |
| **RF-03.2** | Compra Acciones | Alta | TC-TRAD-003, TC-TRAD-004, TC-E2E-006 | ✅ PASS |
| **RF-03.3** | Venta Acciones | Alta | TC-TRAD-005, TC-TRAD-006 | ✅ PASS |
| **RF-03.4** | Historial Órdenes | Alta | TC-HIST-001, TC-HIST-002 | ✅ PASS |
| **RF-04.1** | Visualización Posiciones | Media | TC-PORT-003, TC-PORT-004 | ✅ PASS |
| **RF-04.2** | Cálculo Valor Total | Media | TC-PORT-005, TC-PORT-006 | ✅ PASS |
| **RF-05.1** | Agregar Watchlist | Baja | TC-WATC-001, TC-WATC-002 | ✅ PASS |
| **RF-05.2** | Remover Watchlist | Baja | TC-WATC-003 | ✅ PASS |
| **RF-05.3** | Ver Watchlist | Baja | TC-WATC-004 | ✅ PASS |
| **RNF-01.1** | Tiempo de Respuesta | Alta | TC-PERF-001, TC-PERF-002 | ✅ PASS |
| **RNF-01.2** | Concurrencia | Alta | TC-PERF-003 | ⚠️ REVIEW |
| **RNF-01.3** | Throughput | Alta | TC-PERF-004 | ✅ PASS |
| **RNF-02.1** | Autenticación Segura | Crítica | TC-SEC-001, TC-SEC-002 | ✅ PASS |
| **RNF-02.2** | Protección Vulnerabilidades | Crítica | TC-SEC-003 a TC-SEC-010 | ✅ PASS |
| **RNF-02.3** | HTTPS | Crítica | TC-SEC-011 | ✅ PASS |
| **RNF-03.1** | Accesibilidad | Media | TC-USAB-001 | ✅ PASS |
| **RNF-03.2** | Responsive Design | Media | TC-USAB-002 | ✅ PASS |
| **RNF-03.3** | Performance Web | Media | TC-USAB-003 | ✅ PASS |
| **RNF-04.1** | Calidad de Código | Media | TC-QUAL-001 | ✅ PASS |
| **RNF-04.2** | Cobertura Pruebas | Media | TC-QUAL-002 | ✅ PASS |
| **RNF-04.3** | Documentación | Media | TC-QUAL-003 | ⚠️ IN PROGRESS |

### Cobertura por Módulo

| Módulo | Total Requisitos | Requisitos Cubiertos | % Cobertura |
|--------|------------------|---------------------|-------------|
| Autenticación | 3 | 3 | 100% |
| Dashboard | 2 | 2 | 100% |
| Trading | 4 | 4 | 100% |
| Portfolio | 2 | 2 | 100% |
| Watchlist | 3 | 3 | 100% |
| Performance | 3 | 3 | 100% |
| Seguridad | 3 | 3 | 100% |
| Usabilidad | 3 | 3 | 100% |
| Calidad | 3 | 2 | 67% |
| **TOTAL** | **26** | **25** | **96%** |

---

## 4. DEPENDENCIAS ENTRE REQUISITOS

```
RF-01 (Auth) ──┬──> RF-02 (Dashboard)
               ├──> RF-03 (Trading)
               ├──> RF-04 (Portfolio)
               └──> RF-05 (Watchlist)

RF-03 (Trading) ──> RF-04 (Portfolio)
                 └─> RF-03.4 (Historial)

RNF-02 (Seguridad) ──> RF-01 (Auth)
RNF-01 (Performance) ──> Todos los módulos
```

---

## 5. REQUISITOS FUTUROS (Out of Scope)

### Funcionalidades Futuras:
- [ ] Integración con API de mercado real
- [ ] Notificaciones push
- [ ] Trading algorítmico
- [ ] Social trading
- [ ] Mobile app nativa
- [ ] Análisis técnico avanzado
- [ ] Backtesting de estrategias

---

## 6. REFERENCIAS

- `PLAN_DE_PRUEBAS.md` - Plan general de pruebas
- `CASOS_PRUEBA_UNITARIAS.md` - Casos de prueba detallados
- `CASOS_PRUEBA_E2E.md` - Casos de prueba E2E
- `CASOS_PRUEBA_NO_FUNCIONALES.md` - Casos de seguridad y performance

---

**Última actualización:** [Fecha]  
**Estado:** BORRADOR
