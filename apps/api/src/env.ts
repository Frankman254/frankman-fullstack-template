/**
 * Lectura centralizada de variables de entorno (sin librería extra).
 */

export const isProduction = process.env.NODE_ENV === 'production';

/** Orígenes permitidos para CORS (coma-separado). Vacío → solo FRONTEND_URL o localhost Vite. */
export function getCorsOrigins(): string[] {
	const raw =
		process.env.CORS_ORIGIN?.trim() ||
		process.env.FRONTEND_URL?.trim() ||
		'http://localhost:5173';
	return raw
		.split(',')
		.map(s => s.trim())
		.filter(Boolean);
}
