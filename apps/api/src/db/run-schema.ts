/**
 * Ejecuta el archivo schema.sql contra la base de datos.
 * Uso: npx tsx src/db/run-schema.ts   (desde apps/api)
 * o:   npm run db:schema
 *
 * Requiere que PostgreSQL esté corriendo y que .env tenga DB_* correctos.
 */
import 'dotenv/config';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './pool.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = path.join(__dirname, 'schema.sql');

async function run() {
	const sql = readFileSync(schemaPath, 'utf-8');
	await pool.query(sql);
	console.log('✅ Schema aplicado correctamente (tablas projects y tasks creadas).');
	await pool.end();
}

run().catch((err) => {
	console.error('❌ Error aplicando schema:', err);
	process.exit(1);
});
