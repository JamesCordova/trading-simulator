# 🚀 Guía de Deployment - Trading Simulator App

Esta guía te muestra cómo configurar los workflows de deployment para tu app.

## 📋 Tabla de Contenidos
1. [Vercel Deploy (Recomendado)](#1-vercel-deploy-recomendado)
2. [Docker Hub Deploy](#2-docker-hub-deploy)
3. [GitHub Pages Deploy](#3-github-pages-deploy)

---

## 1. Vercel Deploy (Recomendado)

### ✅ Ventajas
- Deploy automático en cada push
- Preview deployments para Pull Requests
- CDN global automático
- HTTPS gratuito
- Optimizado para Next.js

### 🔑 Secrets Necesarios

| Secret Name | ¿Dónde obtenerlo? |
|-------------|-------------------|
| `VERCEL_TOKEN` | [Vercel Account Tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Vercel Project Settings |
| `VERCEL_PROJECT_ID` | Vercel Project Settings |

### 📝 Pasos de Configuración

#### Paso 1: Crear cuenta en Vercel
```
1. Ve a https://vercel.com
2. Sign up con tu cuenta de GitHub
3. Autoriza el acceso a tu repositorio
```

#### Paso 2: Obtener VERCEL_TOKEN
```
1. Ve a https://vercel.com/account/tokens
2. Click en "Create Token"
3. Nombre: "GitHub Actions Deploy"
4. Scope: Full Account
5. Expiration: No expiration (o el tiempo que prefieras)
6. Click "Create Token"
7. ⚠️ COPIA EL TOKEN INMEDIATAMENTE (no lo volverás a ver)
```

#### Paso 3: Crear proyecto en Vercel
```
1. En Vercel Dashboard, click "Add New..." → "Project"
2. Import tu repositorio: Yemmy03/trading-sim-app
3. Framework Preset: Next.js (debería detectarlo automáticamente)
4. Click "Deploy" (solo para inicializar)
```

#### Paso 4: Obtener IDs del proyecto
```
1. Ve a tu proyecto en Vercel
2. Click en "Settings"
3. Copia "Project ID" (algo como: prj_xxx...)
4. Para Org ID:
   - Settings → General → "Team ID" 
   - O ejecuta en tu terminal local:
     npx vercel link
     (Esto crea .vercel/project.json con los IDs)
```

#### Paso 5: Agregar Secrets en GitHub
```
1. Ve a tu repo: https://github.com/Yemmy03/trading-sim-app
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Agrega estos 3 secrets:

   Name: VERCEL_TOKEN
   Secret: [tu token de Vercel]
   
   Name: VERCEL_ORG_ID
   Secret: [tu org/team ID]
   
   Name: VERCEL_PROJECT_ID
   Secret: [tu project ID]
```

#### Paso 6: Agregar Variables de Entorno en Vercel
```
1. En Vercel Project → Settings → Environment Variables
2. Agrega estas variables:

   NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSyAY_P5ep3xxp88XhJ_djiAHeSfibg8ubrw
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = trading-simulator-440a8.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID = trading-simulator-440a8
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = trading-simulator-440a8.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 398224444164
   NEXT_PUBLIC_FIREBASE_APP_ID = 1:398224444164:web:01bee014b96c9ffa3a5e51

3. Aplica a: Production, Preview, Development
```

#### Paso 7: Deploy
```bash
git add .
git commit -m "Add Vercel deployment workflow"
git push origin main
```

🎉 ¡Tu app se desplegará automáticamente!

### 📊 Verificar Deployment
```
1. Ve a GitHub → Actions tab
2. Verás el workflow "Deploy to Vercel" ejecutándose
3. Cuando termine, ve a Vercel Dashboard
4. Tu app estará en: https://trading-sim-app.vercel.app
```

---

## 2. Docker Hub Deploy

### ✅ Ventajas
- Contenedor portable
- Puede desplegarse en cualquier servidor
- Control total del entorno

### 🔑 Secrets Necesarios

| Secret Name | ¿Dónde obtenerlo? |
|-------------|-------------------|
| `DOCKER_USERNAME` | Tu username de Docker Hub |
| `DOCKER_TOKEN` | [Docker Hub Security](https://hub.docker.com/settings/security) |

### 📝 Pasos de Configuración

#### Paso 1: Crear cuenta en Docker Hub
```
1. Ve a https://hub.docker.com
2. Sign up o login
3. Nota tu username (ej: "yemmy03")
```

#### Paso 2: Crear Access Token
```
1. Ve a https://hub.docker.com/settings/security
2. Click "New Access Token"
3. Token Description: "GitHub Actions"
4. Access permissions: Read, Write, Delete
5. Click "Generate"
6. ⚠️ COPIA EL TOKEN INMEDIATAMENTE
```

#### Paso 3: Agregar Secrets en GitHub
```
1. GitHub repo → Settings → Secrets and variables → Actions
2. Agrega estos secrets:

   Name: DOCKER_USERNAME
   Secret: [tu username de Docker Hub]
   
   Name: DOCKER_TOKEN
   Secret: [tu access token]
```

#### Paso 4: Push y Deploy
```bash
git add .
git commit -m "Add Docker deployment workflow"
git push origin main
```

### 📊 Uso de la Imagen
```bash
# Pull la imagen
docker pull yemmy03/trading-sim-app:main

# Run el contenedor
docker run -d -p 3000:3000 yemmy03/trading-sim-app:main
```

---

## 3. GitHub Pages Deploy

### ⚠️ Limitaciones
- Solo para sitios estáticos
- Requiere modificar Next.js config para export estático
- No soporta API routes de Next.js
- No soporta Server-Side Rendering

### 🔑 Secrets Necesarios

Todos los secrets de Firebase (ya los tienes):

| Secret Name | Valor Actual |
|-------------|--------------|
| `FIREBASE_API_KEY` | AIzaSyAY_P5ep3xxp88XhJ_djiAHeSfibg8ubrw |
| `FIREBASE_AUTH_DOMAIN` | trading-simulator-440a8.firebaseapp.com |
| `FIREBASE_PROJECT_ID` | trading-simulator-440a8 |
| `FIREBASE_STORAGE_BUCKET` | trading-simulator-440a8.appspot.com |
| `FIREBASE_MESSAGING_SENDER_ID` | 398224444164 |
| `FIREBASE_APP_ID` | 1:398224444164:web:01bee014b96c9ffa3a5e51 |

### 📝 Configuración Requerida

#### Paso 1: Modificar next.config.ts
```typescript
// Agregar estas líneas
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  }
}
```

#### Paso 2: Habilitar GitHub Pages
```
1. GitHub repo → Settings → Pages
2. Source: GitHub Actions
3. Save
```

#### Paso 3: Agregar Secrets
```
Agrega los 6 secrets de Firebase en:
Settings → Secrets and variables → Actions
```

#### Paso 4: Deploy
```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

### 📊 Tu sitio estará en:
```
https://yemmy03.github.io/trading-sim-app/
```

---

## 🎯 Comparación Rápida

| Característica | Vercel | Docker | GitHub Pages |
|----------------|--------|--------|--------------|
| **Dificultad** | ⭐ Fácil | ⭐⭐⭐ Difícil | ⭐⭐ Media |
| **Costo** | Gratis | Variable | Gratis |
| **SSR/API** | ✅ Sí | ✅ Sí | ❌ No |
| **Setup** | 5 min | 20 min | 15 min |
| **URL Custom** | ✅ Fácil | ⚠️ Manual | ⚠️ Limitado |

---

## 🔒 Seguridad de Firebase

### ⚠️ Importante
Las API keys de Firebase en el frontend NO son secretas (se exponen al navegador).

### ✅ Protección Real
```
1. Reglas de Firestore (firestore.rules)
2. Reglas de Firebase Auth
3. Restricciones de API key en Firebase Console
```

### 📝 Configurar Restricciones
```
1. Ve a Firebase Console → Project Settings
2. API Keys → Web API Key → Key restrictions
3. Agrega tu dominio de producción:
   - https://trading-sim-app.vercel.app
   - https://yemmy03.github.io
```

---

## 🆘 Troubleshooting

### Error: "VERCEL_TOKEN is not set"
```
Verifica que agregaste el secret en GitHub Settings
```

### Error: "Docker login failed"
```
1. Verifica DOCKER_USERNAME y DOCKER_TOKEN
2. Asegúrate que el token tiene permisos Write
```

### Error: "Build failed"
```
1. Corre npm run build localmente primero
2. Verifica que no hay errores de TypeScript
3. Revisa los logs en GitHub Actions
```

---

## 📚 Recursos Adicionales

- [Vercel Docs](https://vercel.com/docs)
- [Docker Hub](https://hub.docker.com)
- [GitHub Actions](https://docs.github.com/actions)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**¿Necesitas ayuda?** Revisa los logs en GitHub Actions tab de tu repositorio.
