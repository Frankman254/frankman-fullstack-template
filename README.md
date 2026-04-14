# Full-Stack Starter

**Plantilla full-stack neutra** (monorepo): React + Express + **Microsoft SQL Server**, lista para personalizar nombre de producto y dominio.

## ⚡ Inicio Rápido

### Windows (PowerShell)

```powershell
# Opción 1: Script automático (recomendado)
.\scripts\setup.ps1

# Opción 2: Manual
npm install --force
npm run setup

# Desarrollo (2 terminales)
npm run dev:api    # Terminal 1 - Backend
npm run dev:web    # Terminal 2 - Frontend
```

### Linux/Mac

```bash
# Opción 1: Script automático (recomendado)
./scripts/setup.sh

# Opción 2: Manual
npm install
npm run setup

# Desarrollo (2 terminales)
npm run dev:api    # Terminal 1 - Backend
npm run dev:web    # Terminal 2 - Frontend
```

### Instalación Rápida (Todos los sistemas)

```bash
npm install --force
npm run dev:web
```

## 🎯 Plantilla Reutilizable

Esta plantilla está diseñada para ser **completamente personalizable**:

- ✅ **Nombre de la aplicación** configurable
- ✅ **Puertos dinámicos** para frontend y backend
- ✅ **Configuración de base de datos** personalizable
- ✅ **Variables de entorno** generadas automáticamente
- ✅ **Scripts de inicialización** interactivos

## 🏗️ Estructura Compacta

```
fullstack-starter/
├─ apps/
│  ├─ web/          # React + Vite + Tailwind
│  └─ api/          # Express + TypeScript + SQL Server (mssql)
├─ packages/
│  └─ shared/       # @fullstack-starter/shared (tipos / DTOs)
├─ scripts/
└─ .env.example
```

## 🚀 Comandos Principales

### Desarrollo

```bash
npm run dev         # Ambos juntos
npm run dev:web     # Solo frontend
npm run dev:api     # Solo backend
```

### Build y Deploy

```bash
npm run build       # Construir ambos
npm run build:web   # Solo frontend
npm run build:api   # Solo backend
```

### Calidad de Código

```bash
npm run lint        # Lint ambos
npm run type-check  # Verificar tipos
npm run clean       # Limpiar builds
```

## 🛠️ Stack Tecnológico

### Frontend

- **React 19** + **TypeScript**
- **Vite** para desarrollo rápido
- **Tailwind CSS** para estilos
- **ESLint** con tabs

### Backend

- **Express.js** + **TypeScript**
- **SQL Server** vía el driver **`mssql`**
- Rutas de ejemplo (`/health`, `/api/test-db`, proyectos/tareas)

### Compartido

- **npm workspaces** (`apps/*`, `packages/*`)
- **`@fullstack-starter/shared`**
- Variables de entorno alineadas entre API y Vite

## 🔧 Configuración Manual

### 1. Instalación

**Windows:**

```powershell
npm install --force
```

**Linux/Mac:**

```bash
npm install
```

> **Nota para Windows:** Se usa `--force` para asegurar que las dependencias opcionales de Rollup se instalen correctamente. Esto es necesario debido a un bug conocido de npm con dependencias opcionales en Windows.

### 2. SQL Server (instancia que ya tengas o Docker opcional)

La API espera una instancia accesible (`DB_HOST`, `DB_PORT`, usuario/contraseña) y una **base ya creada** (`DB_NAME`). Crea la base en SSMS / Azure Data Studio, por ejemplo:

```sql
CREATE DATABASE app_dev;
```

**Si ya tienes** un contenedor como `sqlserver-dev` en **localhost:1433**, deja `DB_PORT=1433` en `.env` y no hace falta el `docker-compose` de este repo.

**Contenedor opcional** (perfil `local-db`, puerto host **14333** para no chocar con otra instancia en 1433):

```bash
docker compose --profile local-db up -d
```

Ajusta en `.env` `DB_PORT=14333` (o el puerto que mapees) y la misma contraseña en `DB_PASSWORD` y `MSSQL_SA_PASSWORD` del compose.

### 3. Variables de entorno

```bash
cp .env.example .env
# Ajusta DB_* y, si aplica, API_BASE_URL / CORS_ORIGIN
```

### 4. Esquema en la base

```bash
npm run db:schema
```

## 📦 URLs de Desarrollo

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## 🎨 Convenciones

- **Indentación**: Tabs con width 4
- **Componentes**: PascalCase (`UserCard.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useAuth.ts`)
- **Tipos**: PascalCase (`User`, `ApiResponse`)

## 📚 Documentación Completa

Para documentación detallada, configuración avanzada y ejemplos, consulta:

- **`TEMPLATE-USAGE.md`** - Guía de uso de la plantilla
- **`template-config.md`** - Documentación completa de la plantilla
- **`IMPLEMENTATION.md`** - Detalles técnicos de la implementación
- **`scripts/init-project.sh`** - Script de personalización completa

## 🚀 Deploy

### Frontend (Vercel/Netlify)

```bash
npm run build:web
# Deploy dist/ folder
```

### Backend (Railway/Heroku)

```bash
npm run build:api
# Deploy con variables de entorno
```

---

**¡Esta plantilla está lista para usar en tus proyectos!** 🎉

Para más detalles, ejecuta `./scripts/setup.sh` o consulta `template-config.md`.
