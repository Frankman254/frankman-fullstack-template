/**
 * Pool de conexiones Microsoft SQL Server (driver `mssql`).
 * Crea la base `DB_NAME` en SSMS / Azure Data Studio antes de `npm run db:schema` si aún no existe.
 */

import 'dotenv/config';
import sql from 'mssql';

function buildConfig(): sql.config {
	const password = process.env.DB_PASSWORD ?? '';
	const trustServerCertificate =
		process.env.DB_TRUST_SERVER_CERTIFICATE !== 'false';

	return {
		user: process.env.DB_USER ?? 'sa',
		password,
		server: process.env.DB_HOST ?? 'localhost',
		port: parseInt(process.env.DB_PORT ?? '1433', 10),
		database: process.env.DB_NAME ?? 'master',
		options: {
			encrypt: process.env.DB_ENCRYPT === 'true',
			trustServerCertificate,
		},
		pool: {
			max: 10,
			min: 0,
			idleTimeoutMillis: 30000,
		},
	};
}

let pool: sql.ConnectionPool | null = null;

export async function connectPool(): Promise<void> {
	if (pool) return;
	pool = await new sql.ConnectionPool(buildConfig()).connect();
}

export function getPool(): sql.ConnectionPool {
	if (!pool) {
		throw new Error(
			'Base de datos no inicializada: llama a connectPool() antes de usar la API.'
		);
	}
	return pool;
}

export async function closePool(): Promise<void> {
	if (pool) {
		await pool.close();
		pool = null;
	}
}

/** Resumen sin contraseña (solo para depuración en desarrollo). */
export function getConnectionSummary(): string {
	const c = buildConfig();
	const mask = c.password ? '***' : '(vacía)';
	return `Server=${c.server},${c.port};Database=${c.database};User=${c.user};Password=${mask}`;
}

export { sql };
