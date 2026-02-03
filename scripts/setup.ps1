# 🚀 FrankmanTaskFast - Script de Configuración para Windows (PowerShell)
# Este script configura automáticamente el proyecto en Windows

Write-Host "🚀 Configurando FrankmanTaskFast..." -ForegroundColor Cyan
Write-Host ""

# Verificar Node.js
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js $nodeVersion detectado" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js no está instalado. Por favor instala Node.js 18+" -ForegroundColor Red
    exit 1
}

# Verificar npm
try {
    $npmVersion = npm -v
    Write-Host "✅ npm $npmVersion detectado" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "❌ npm no está instalado" -ForegroundColor Red
    exit 1
}

# Instalar dependencias
Write-Host "📦 Instalando dependencias..." -ForegroundColor Cyan
Write-Host "   (Usando --force para Windows debido a dependencias opcionales)" -ForegroundColor Yellow
Write-Host ""

try {
    npm install --force
    Write-Host ""
    Write-Host "✅ Dependencias instaladas correctamente" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host ""
    Write-Host "❌ Error al instalar dependencias" -ForegroundColor Red
    Write-Host "💡 Intenta ejecutar: npm install --force" -ForegroundColor Yellow
    exit 1
}

# Configurar variables de entorno
if (-not (Test-Path ".env")) {
    Write-Host "📝 Creando archivo .env..." -ForegroundColor Cyan
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "✅ Archivo .env creado desde .env.example" -ForegroundColor Green
    } elseif (Test-Path "env.example") {
        Copy-Item "env.example" ".env"
        Write-Host "✅ Archivo .env creado desde env.example" -ForegroundColor Green
    } else {
        Write-Host "⚠️  No se encontró archivo .env.example" -ForegroundColor Yellow
    }
    Write-Host "   Por favor edita el archivo .env con tus credenciales" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host "⚠️  Archivo .env ya existe" -ForegroundColor Yellow
    Write-Host ""
}

# Verificar que todo funciona
Write-Host "🔍 Verificando configuración..." -ForegroundColor Cyan
Write-Host ""

# Lint check
try {
    npm run lint 2>&1 | Out-Null
    Write-Host "✅ Lint check pasado" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Lint check falló - ejecuta 'npm run lint' para ver detalles" -ForegroundColor Yellow
}

# Type check
try {
    npm run type-check 2>&1 | Out-Null
    Write-Host "✅ Type check pasado" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Type check falló - ejecuta 'npm run type-check' para ver detalles" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 ¡Configuración completada!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Edita el archivo .env con tus credenciales (si es necesario)"
Write-Host "2. Ejecuta 'npm run dev:api' en una terminal"
Write-Host "3. Ejecuta 'npm run dev:web' en otra terminal"
Write-Host "4. Visita http://localhost:5173 para el frontend"
Write-Host "5. Visita http://localhost:3001/health para el backend"
Write-Host ""
Write-Host "🚀 ¡Feliz coding!" -ForegroundColor Cyan
Write-Host ""

