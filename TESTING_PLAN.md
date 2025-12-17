1. PRUEBAS ADICIONALES

Las siguientes pruebas son automatizables (total o parcialmente) y complementan las pruebas funcionales:

Pruebas de API REST
(Firebase API, Stock Price API)
✔ Automatizables para validación de respuestas, códigos HTTP, contratos y errores.

Pruebas de Base de Datos
(Firestore queries)
✔ Automatizables para validación de datos, reglas de seguridad e integridad usando emuladores.

Pruebas de Rendimiento
(Load testing)
✔ Automatizables para medir tiempos de respuesta, concurrencia y estrés del sistema.

Pruebas de Seguridad
(OWASP básicas)
✔ Automatización parcial para detección de vulnerabilidades comunes y configuraciones inseguras.

Pruebas de Accesibilidad
(WCAG)
✔ Automatización parcial para validaciones técnicas (contraste, ARIA, labels).

Pruebas de Regresión
✔ Altamente automatizables para asegurar que cambios no rompan funcionalidades existentes.

Pruebas de Humo (Smoke tests)
✔ Totalmente automatizables para verificar la estabilidad básica del sistema.

2. AUTOMATIZACIÓN AVANZADA

Se propone la siguiente estrategia de automatización avanzada:

Pruebas de API con Postman / Newman
✔ Ejecución automática de colecciones en pipelines CI/CD.

Pruebas de carga con Artillery / k6
✔ Simulación de usuarios concurrentes y medición de rendimiento bajo carga.

Integración con Selenium
✔ Alternativa a Playwright para automatización de pruebas end-to-end en navegadores.

GitHub Actions – workflows robustos
✔ Automatización de:

Ejecución de pruebas

Reportes automáticos

Validación en cada push / pull request

Gates de calidad antes del despliegue
📌 Resumen ejecutivo

Todas las pruebas listadas pueden integrarse en un flujo automatizado.

Seguridad y accesibilidad requieren complemento manual.

La automatización avanzada fortalece calidad, velocidad y confiabilidad del proceso de desarrollo.

Si quieres, puedo ayudarte a:

Convertir esto en un Plan de Pruebas formal

Armar un pipeline CI/CD en GitHub Actions

Definir qué pruebas ejecutar en cada etapa (commit, PR, release)