# ⚡ Lighthouse CI Integration - Trading Simulator

## 📋 Resumen

Este proyecto incluye integración automática de **Lighthouse CI** para auditar el rendimiento, accesibilidad, SEO y mejores prácticas de la aplicación desplegada en **Vercel**.

## 🚀 ¿Cómo Funciona?

### Flujo Automático:

1. **Push a `main`** → Ejecuta workflow de Vercel
2. **Vercel deploys** → Aplicación en producción
3. **Lighthouse workflow** se activa automáticamente
4. **Lighthouse audita** la URL de producción (3 ejecuciones)
5. **Reportes se publican** en GitHub Pages

## 📊 Métricas Auditadas

### Performance ⚡
- **First Contentful Paint (FCP)**: < 2s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Total Blocking Time (TBT)**: < 300ms
- **Speed Index**: < 3s

### Accessibility ♿
- Contraste de colores
- Etiquetas ARIA
- Navegación por teclado
- Textos alternativos

### Best Practices ✅
- HTTPS
- Consola sin errores
- Imágenes optimizadas
- APIs modernas

### SEO 🔍
- Meta tags
- Estructura semántica
- Velocidad de carga
- Mobile-friendly

### PWA 📱
- Manifest
- Service Worker
- Instalabilidad

## 📁 Archivos Creados

### `.github/workflows/lighthouse.yml`
Workflow principal de Lighthouse que:
- Espera a que Vercel termine el deploy
- Ejecuta Lighthouse 3 veces (promedio más confiable)
- Genera reportes HTML
- Sube artifacts a GitHub

### `lighthouserc.json`
Configuración de Lighthouse CI:
```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,  // 3 ejecuciones para promediar
      "settings": {
        "preset": "desktop",
        "onlyCategories": ["performance", "accessibility", "best-practices", "seo", "pwa"]
      }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", {"minScore": 0.7}],
        "categories:accessibility": ["warn", {"minScore": 0.9}],
        // ... más assertions
      }
    }
  }
}
```

## 🌐 Acceso a Reportes

### GitHub Pages
Los reportes se publican automáticamente en:
- **Hub Principal**: https://jamescordova.github.io/trading-simulator/
- **Lighthouse Summary**: https://jamescordova.github.io/trading-simulator/lighthouse/summary/
- **Reportes Detallados**: https://jamescordova.github.io/trading-simulator/lighthouse/

### GitHub Actions
También puedes descargar los artifacts directamente:
1. Ve a **Actions** → **Lighthouse Performance Audit**
2. Selecciona el run más reciente
3. Descarga **lighthouse-reports** artifact

## 🔧 Configuración Requerida

### Variables de Entorno (Ya configuradas en tu repo)
- `VERCEL_TOKEN` - Token de acceso a Vercel
- `VERCEL_ORG_ID` - ID de organización de Vercel
- `VERCEL_PROJECT_ID` - ID del proyecto en Vercel

### URL de Producción
El workflow **obtiene automáticamente** la URL de Vercel del deployment:
- URL de producción principal: `https://trading-simulator-beryl.vercel.app`
- El workflow captura la URL real del comando `vercel deploy`
- Si falla, usa la URL de producción por defecto como fallback

**✅ Ventajas**:
- No necesitas actualizar URLs manualmente
- Siempre audita el deployment más reciente
- Funciona con URLs de preview y producción

## 🎯 Umbrales de Calidad

| Categoría | Objetivo | Alerta si < |
|-----------|----------|-------------|
| Performance | 90+ | 70 |
| Accessibility | 100 | 90 |
| Best Practices | 100 | 80 |
| SEO | 100 | 80 |
| PWA | N/A | N/A |

## 📈 Interpretación de Scores

- 🟢 **90-100**: Excelente
- 🟡 **50-89**: Necesita mejoras
- 🔴 **0-49**: Pobre (requiere atención inmediata)

## 🔄 Ejecución Manual

Puedes ejecutar el workflow manualmente:

1. Ve a **Actions** → **Lighthouse Performance Audit**
2. Click en **Run workflow**
3. Selecciona branch `main`
4. Click **Run workflow**

## 📝 Mejoras Sugeridas (Basadas en Lighthouse)

### Performance
- ✅ Lazy loading de imágenes
- ✅ Code splitting
- ✅ Minificación de JS/CSS
- ⚠️ Considera: Preload de fonts críticos
- ⚠️ Considera: Optimizar imágenes (WebP)

### Accessibility
- ✅ Contraste de colores adecuado
- ✅ Labels en inputs
- ⚠️ Verifica: Navegación por teclado completa

### SEO
- ✅ Meta tags configurados
- ⚠️ Añade: Sitemap.xml
- ⚠️ Añade: robots.txt

### PWA
- ⚠️ Considera: Service Worker
- ⚠️ Considera: Manifest.json
- ⚠️ Considera: Offline support

## 🐛 Troubleshooting

### El workflow falla con "Sitio no accesible"
- Verifica que la URL de Vercel sea correcta
- Asegúrate de que el deploy de Vercel haya terminado
- Aumenta el tiempo de espera en el workflow (línea 34)

### Scores muy bajos
- Verifica que la aplicación esté optimizada
- Revisa los reportes detallados para recomendaciones específicas
- Considera implementar las mejoras sugeridas

### Reportes no aparecen en GitHub Pages
- Verifica que el workflow `publish-reports.yml` se haya ejecutado
- Revisa los logs de GitHub Actions
- Asegúrate de que GitHub Pages esté habilitado

## 📚 Recursos

- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Web Vitals](https://web.dev/vitals/)
- [Vercel Analytics](https://vercel.com/docs/analytics)

## ✨ Features Adicionales

### Comparación de Runs
Los reportes guardan las últimas 3 ejecuciones para ver:
- Tendencias de performance
- Regresiones
- Mejoras implementadas

### Notificaciones
El workflow puede comentar en PRs con los resultados (configurado)

### Integración con SonarCloud
Los reportes de Lighthouse se complementan con:
- Análisis de código (SonarCloud)
- Coverage de tests (Jest)
- Quality metrics (ESLint)

---

**Autor**: Trading Simulator Team  
**Última actualización**: Diciembre 2025  
**Versión**: 1.0.0
