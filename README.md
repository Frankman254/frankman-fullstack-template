# 🚀 FrankmanTaskFast

**Plantilla de proyecto full-stack optimizada** con monorepo, diseñada para ser compacta, funcional y fácil de entender.

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
frankman-task-fast/
├─ apps/
│  ├─ web/          # React + Vite + Tailwind (frontend)
│  └─ api/          # Express + TypeScript + PostgreSQL (backend)
├─ scripts/         # Scripts de configuración
└─ .env.example     # Variables de entorno
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
- **PostgreSQL** con conexión configurada
- **Endpoints básicos** para testing
- **Plantilla limpia** lista para personalizar

### Compartido

- **npm workspaces** para monorepo
- **Tipos compartidos** entre apps
- **Configuraciones centralizadas**

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

### 2. Base de datos en Docker (PostgreSQL)

**Este proyecto usa PostgreSQL**, no SQL Server. Si ya tienes SQL Server en Docker (puerto 1433), necesitas un contenedor aparte para PostgreSQL (puerto 5432).

Desde la raíz del proyecto:

```bash
# Levantar solo PostgreSQL (nombre del contenedor: frankman-task-fast-db)
docker compose up -d

# Ver logs
docker compose logs -f postgres
```

Valores por defecto del contenedor (coinciden con el código): usuario `postgres`, contraseña `password`, base de datos `frankman_task_fast`, puerto **5432**. Para usar otros valores, define `DB_USER`, `DB_PASSWORD`, `DB_NAME` y `DB_PORT` en tu `.env` antes de `docker compose up`.

### 3. Variables de Entorno

```bash
cp .env.example .env
# Editar .env con tus credenciales (DB_HOST=localhost, DB_PORT=5432 para Docker)
```

### 4. Base de Datos (tras tener PostgreSQL corriendo)

```bash
# Si usas Docker: la base ya está creada al levantar el contenedor

# Ejecutar migraciones (cuando existan)
cd apps/api
npm run migrate

# Poblar con datos de ejemplo (cuando existan)
npm run seed
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
