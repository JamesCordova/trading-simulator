# K6 Performance Testing

Este documento describe la implementación de pruebas de rendimiento con K6 para la aplicación Trading Simulator.

## 📊 Descripción

K6 es una herramienta de código abierto para pruebas de carga y rendimiento. Permite simular tráfico de usuarios para medir el rendimiento de la aplicación bajo diferentes condiciones de carga.

## 🎯 Objetivos de las Pruebas

- **Validar el rendimiento** de las páginas principales de la aplicación
- **Detectar cuellos de botella** antes de que afecten a usuarios reales
- **Establecer líneas base** de rendimiento para futuras comparaciones
- **Simular cargas realistas** de usuarios concurrentes

## 📁 Estructura

```
k6/
└── performance-test.js    # Script principal de pruebas K6
```

## 🧪 Escenarios de Prueba

### 1. Landing Page
- **Endpoint**: `/`
- **Validación**: Status 200, tiempo de carga < 2s
- **Métricas**: Tiempo de respuesta, tasa de errores

### 2. Dashboard
- **Endpoint**: `/dashboard`
- **Validación**: Status 200 o 307 (redirect), tiempo de carga < 3s
- **Métricas**: Tiempo de respuesta, tasa de errores

### 3. Static Assets
- **Recursos**: CSS, favicon, JavaScript
- **Validación**: Status 200 o 304 (cached)
- **Métricas**: Tiempo de carga de recursos estáticos

### 4. Multiple Page Navigation
- **Escenario**: Navegación entre múltiples páginas
- **Validación**: Todas las páginas cargan correctamente
- **Métricas**: Rendimiento en navegación secuencial

## 📈 Configuración de Carga

El test simula el siguiente patrón de tráfico:

```javascript
stages: [
  { duration: '30s', target: 20 },  // Ramp-up: 0 → 20 usuarios
  { duration: '1m', target: 20 },   // Sostenido: 20 usuarios
  { duration: '30s', target: 50 },  // Spike: 20 → 50 usuarios
  { duration: '1m', target: 50 },   // Peak: 50 usuarios
  { duration: '30s', target: 0 },   // Ramp-down: 50 → 0 usuarios
]
```

**Total**: ~3.5 minutos de prueba

## 🎯 Umbrales de Rendimiento

```javascript
thresholds: {
  'http_req_duration': ['p(95)<2000'],  // 95% de requests < 2s
  'http_req_failed': ['rate<0.1'],      // < 10% de errores
  'errors': ['rate<0.1'],               // Tasa de error personalizada < 10%
}
```

## 🚀 Ejecución Local

### Prerrequisitos

Instalar K6:

**Windows (Chocolatey)**:
```powershell
choco install k6
```

**macOS (Homebrew)**:
```bash
brew install k6
```

**Linux (Debian/Ubuntu)**:
```bash
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

### Ejecutar Pruebas

```bash
# Prueba básica
k6 run k6/performance-test.js

# Guardar resultados en JSON
k6 run --out json=results.json k6/performance-test.js

# Ver resultados en tiempo real
k6 run --out influxdb=http://localhost:8086/k6 k6/performance-test.js
```

## 🤖 Integración CI/CD

### GitHub Actions Workflow

El workflow `.github/workflows/k6-performance.yml` se ejecuta:

- ✅ **Manualmente**: via `workflow_dispatch`
- ✅ **En cada push** a la rama `main`

### Artifacts Generados

Los siguientes archivos se guardan como artifacts:

1. **`index.html`**: Reporte visual con métricas y gráficos
2. **`results.json`**: Datos completos en formato JSON
3. **`console-output.txt`**: Salida de consola de K6

## 📊 Reportes

Los reportes de K6 se publican automáticamente en GitHub Pages:

**URL**: `https://[usuario].github.io/trading-simulator/k6/`

### Contenido del Reporte

- **Métricas clave**: Requests totales, duración promedio, tasa de errores
- **Salida de consola**: Output completo de K6
- **Resultados JSON**: Descargables para análisis detallado

## 🔍 Métricas Personalizadas

El script incluye métricas personalizadas:

```javascript
const errorRate = new Rate('errors');           // Tasa de errores personalizada
const pageLoadTime = new Trend('page_load_time'); // Tiempo de carga de páginas
```

## 📖 Interpretación de Resultados

### Métricas Principales

| Métrica | Descripción | Umbral Recomendado |
|---------|-------------|-------------------|
| `http_req_duration` | Tiempo de respuesta | p95 < 2000ms |
| `http_req_failed` | Tasa de fallos HTTP | < 10% |
| `http_reqs` | Total de requests | - |
| `vus` | Usuarios virtuales activos | Según configuración |
| `iterations` | Iteraciones completadas | - |

### Indicadores de Problemas

🔴 **Crítico**:
- Tasa de errores > 10%
- p95 de duración > 5000ms
- Múltiples timeouts

🟡 **Advertencia**:
- Tasa de errores 5-10%
- p95 de duración 2000-5000ms
- Aumento gradual del tiempo de respuesta

🟢 **Saludable**:
- Tasa de errores < 5%
- p95 de duración < 2000ms
- Tiempos de respuesta estables

## 🛠️ Personalización

### Modificar Escenarios de Carga

Edita `k6/performance-test.js`:

```javascript
export let options = {
  stages: [
    { duration: '1m', target: 100 },  // Más usuarios
    { duration: '5m', target: 100 },  // Más duración
    // ... más stages
  ],
};
```

### Agregar Nuevos Endpoints

```javascript
group('Nueva Página', function () {
  const res = http.get(`${BASE_URL}/nueva-ruta`);
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
});
```

### Ajustar Umbrales

```javascript
thresholds: {
  'http_req_duration': ['p(95)<1000'],  // Más estricto
  'http_req_failed': ['rate<0.05'],     // 5% máximo
}
```

## 🔗 Recursos

- [K6 Documentation](https://k6.io/docs/)
- [K6 Examples](https://k6.io/docs/examples/)
- [Performance Testing Best Practices](https://k6.io/docs/testing-guides/test-types/)
- [K6 Cloud](https://app.k6.io/) - Plataforma de análisis en la nube

## 🆘 Troubleshooting

### Error: "Connection refused"
**Causa**: La aplicación no está accesible  
**Solución**: Verifica que la URL en `BASE_URL` sea correcta

### Timeout en requests
**Causa**: La aplicación responde lentamente  
**Solución**: Aumenta el threshold o investiga el rendimiento del servidor

### Métricas inesperadas
**Causa**: Cachés, CDN, o balanceadores de carga  
**Solución**: Considera estos factores en el análisis

## 📝 Notas

- Las pruebas se ejecutan contra el **entorno de producción** en Vercel
- Los resultados pueden variar según la ubicación geográfica del runner
- GitHub Actions ejecuta desde servidores en EE.UU.
- Para pruebas más precisas, considera ejecutar localmente desde diferentes ubicaciones

## 🎯 Próximos Pasos

- [ ] Agregar pruebas con autenticación (usuarios logueados)
- [ ] Implementar smoke tests (pruebas rápidas pre-deployment)
- [ ] Configurar alertas basadas en umbrales
- [ ] Integrar con InfluxDB + Grafana para dashboards en tiempo real
- [ ] Agregar pruebas de estrés más agresivas
