#!/usr/bin/env node

/**
 * Script postinstall para solucionar problemas con dependencias opcionales
 * especialmente en Windows con Rollup
 */

import { execSync } from 'child_process';
import { platform, arch } from 'os';

const isWindows = platform() === 'win32';
const isX64 = arch() === 'x64';

console.log('🔧 Ejecutando postinstall...');

if (isWindows && isX64) {
	try {
		console.log(
			'📦 Instalando dependencias opcionales de Rollup para Windows...'
		);
		// Intentar instalar el paquete faltante de rollup para Windows
		try {
			execSync(
				'npm install @rollup/rollup-win32-x64-msvc --save-optional --no-save',
				{
					stdio: 'inherit',
					cwd: process.cwd(),
				}
			);
			console.log('✅ Dependencias opcionales instaladas correctamente');
		} catch (error) {
			// Si falla, intentar reinstalar todas las dependencias opcionales
			console.log('⚠️  Reinstalando dependencias opcionales...');
			try {
				execSync('npm install --force', {
					stdio: 'inherit',
					cwd: process.cwd(),
				});
			} catch (retryError) {
				console.log(
					'⚠️  No se pudieron instalar las dependencias opcionales automáticamente'
				);
				console.log(
					'💡 Si tienes problemas, ejecuta: npm install --force'
				);
			}
		}
	} catch (error) {
		console.log(
			'⚠️  Error en postinstall, pero el proyecto debería funcionar'
		);
	}
} else {
	console.log('✅ Postinstall completado');
}
