#!/usr/bin/env node

/**
 * Script de setup para Windows y otros sistemas
 * Configura el proyecto automáticamente
 */

import { execSync } from 'child_process';
import { existsSync, copyFileSync } from 'fs';
import { join } from 'path';
import { platform } from 'os';

const isWindows = platform() === 'win32';

console.log('🚀 Configurando el monorepo full-stack...\n');

// Verificar Node.js
try {
	const nodeVersion = execSync('node -v', { encoding: 'utf-8' }).trim();
	console.log(`✅ Node.js ${nodeVersion} detectado`);
} catch (error) {
	console.error(
		'❌ Node.js no está instalado. Por favor instala Node.js 18+'
	);
	process.exit(1);
}

// Verificar npm
try {
	const npmVersion = execSync('npm -v', { encoding: 'utf-8' }).trim();
	console.log(`✅ npm ${npmVersion} detectado\n`);
} catch (error) {
	console.error('❌ npm no está instalado');
	process.exit(1);
}

// Instalar dependencias
console.log('📦 Instalando dependencias...');
try {
	if (isWindows) {
		// En Windows, usar --force para asegurar que las dependencias opcionales se instalen
		console.log(
			'   (Usando --force para Windows debido a dependencias opcionales)\n'
		);
		execSync('npm install --force', { stdio: 'inherit' });
	} else {
		execSync('npm install', { stdio: 'inherit' });
	}
	console.log('\n✅ Dependencias instaladas correctamente\n');
} catch (error) {
	console.error('\n❌ Error al instalar dependencias');
	console.error('💡 Intenta ejecutar: npm install --force');
	process.exit(1);
}

// Configurar variables de entorno
if (!existsSync('.env')) {
	console.log('📝 Creando archivo .env...');
	if (existsSync('.env.example')) {
		copyFileSync('.env.example', '.env');
		console.log('✅ Archivo .env creado desde .env.example');
	} else if (existsSync('env.example')) {
		copyFileSync('env.example', '.env');
		console.log('✅ Archivo .env creado desde env.example');
	} else {
		console.log('⚠️  No se encontró archivo .env.example');
	}
	console.log('   Por favor edita el archivo .env con tus credenciales\n');
} else {
	console.log('⚠️  Archivo .env ya existe\n');
}

const webEnv = join('apps', 'web', '.env');
const webEnvExample = join('apps', 'web', '.env.example');
if (!existsSync(webEnv)) {
	if (existsSync(webEnvExample)) {
		copyFileSync(webEnvExample, webEnv);
		console.log('✅ Creado apps/web/.env desde apps/web/.env.example\n');
	} else {
		console.log(
			'⚠️  No hay apps/web/.env.example; crea apps/web/.env manualmente si el frontend lo necesita\n'
		);
	}
} else {
	console.log('⚠️  apps/web/.env ya existe\n');
}

// Verificar que todo funciona
console.log('🔍 Verificando configuración...\n');

// Lint check
try {
	execSync('npm run lint', { stdio: 'ignore' });
	console.log('✅ Lint check pasado');
} catch (error) {
	console.log(
		'⚠️  Lint check falló - ejecuta "npm run lint" para ver detalles'
	);
}

// Type check
try {
	execSync('npm run type-check', { stdio: 'ignore' });
	console.log('✅ Type check pasado');
} catch (error) {
	console.log(
		'⚠️  Type check falló - ejecuta "npm run type-check" para ver detalles'
	);
}

console.log('\n🎉 ¡Configuración completada!\n');
console.log('📋 Próximos pasos:');
console.log('1. Edita el archivo .env con tus credenciales (si es necesario)');
console.log('2. Ejecuta "npm run dev:api" en una terminal');
console.log('3. Ejecuta "npm run dev:web" en otra terminal');
console.log('4. Visita http://localhost:5173 para el frontend');
console.log('5. Visita http://localhost:3001/health para el backend\n');
console.log('🚀 ¡Feliz coding!\n');
