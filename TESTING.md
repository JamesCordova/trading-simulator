# Testing Guide

Este proyecto incluye tests automatizados usando Jest y React Testing Library.

## 📊 Ver Reportes en Línea

Los reportes de tests se publican automáticamente en GitHub Pages:

- 🏠 **Hub de Reportes**: https://yemmy03.github.io/trading-sim-app/
- 🚀 **Dashboard CI/CD**: https://yemmy03.github.io/trading-sim-app/dashboard/
- 📈 **Reporte de Coverage**: https://yemmy03.github.io/trading-sim-app/coverage/

Los reportes se actualizan automáticamente cada vez que haces push a `main`.

## 🧪 Ejecutar Tests

### Ejecutar todos los tests
```bash
npm test
```

### Ejecutar tests en modo watch (desarrollo)
```bash
npm run test:watch
```

### Generar reporte de cobertura
```bash
npm run test:coverage
```

## 📁 Estructura de Tests

```
src/
├── app/
│   ├── __tests__/
│   │   └── app.test.js          # Tests de lógica de negocio
│   └── components/
│       └── __tests__/
│           ├── LoadingSpinner.test.jsx
│           └── PortfolioCard.test.jsx
```

## ✅ Tests Actuales

### LoadingSpinner Component
- ✅ Renderiza el spinner correctamente
- ✅ Muestra mensaje por defecto
- ✅ Muestra mensaje personalizado
- ✅ Muestra mensaje de espera

### PortfolioCard Component
- ✅ Renderiza título y valores
- ✅ Formatea moneda correctamente
- ✅ Muestra cambios positivos
- ✅ Muestra cambios negativos
- ✅ Toggle de visibilidad
- ✅ Persistencia en localStorage

### Business Logic
- ✅ Cálculo de porcentajes
- ✅ Formato de moneda
- ✅ Validación de órdenes de compra
- ✅ Validación de órdenes de venta
- ✅ Cálculo de totales

## 🤖 CI/CD

Los tests se ejecutan automáticamente en GitHub Actions cuando:
- Haces push a `main` o `develop`
- Creas un Pull Request

Ver: `.github/workflows/test.yml`

## 📊 Cobertura de Código

El reporte de cobertura se genera en la carpeta `coverage/` después de ejecutar:
```bash
npm run test:coverage
```

Abre `coverage/lcov-report/index.html` en tu navegador para ver el reporte detallado.

## 🔧 Configuración

- **jest.config.js** - Configuración principal de Jest
- **jest.setup.js** - Setup y mocks globales

## 📝 Mejores Prácticas

1. **Nombrar tests descriptivamente**: Usa `it('should...')` o `it('renders...')`
2. **Organizar tests**: Agrupa tests relacionados con `describe()`
3. **Arrange-Act-Assert**: Estructura clara en cada test
4. **Mock externos**: Firebase, APIs, y dependencias externas
5. **Cobertura**: Apunta a >80% de cobertura

## 🚀 Agregar Nuevos Tests

1. Crea archivo `ComponentName.test.jsx` en `__tests__/`
2. Importa el componente y testing utilities
3. Escribe tests descriptivos
4. Ejecuta `npm test` para verificar

Ejemplo:
```jsx
import { render, screen } from '@testing-library/react'
import MyComponent from '../MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```
