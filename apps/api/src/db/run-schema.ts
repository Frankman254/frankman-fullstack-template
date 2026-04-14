/**
 * Ejecuta schema.sql contra SQL Server.
 * Requiere instancia en marcha, credenciales en .env y base DB_NAME ya creada.
 */
import 'dotenv/config';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { closePool, connectPool, getPool } from './pool.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = path.join(__dirname, 'schema.sql');

async function run() {
	await connectPool();
	const pool = getPool();
	const sqlText = readFileSync(schemaPath, 'utf-8');
	await pool.request().query(sqlText);
	console.log(
		'✅ Schema aplicado correctamente (tablas dbo.projects y dbo.tasks).'
	);
	await closePool();
}

run().catch(err => {
	console.error('❌ Error aplicando schema:', err);
	process.exit(1);
});
