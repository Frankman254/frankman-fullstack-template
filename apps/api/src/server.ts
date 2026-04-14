/**
 * Arranque: conecta a SQL Server y levanta Express.
 */

import 'dotenv/config';
import { connectPool } from './db/pool.js';

const port = parseInt(process.env.BACKEND_PORT || '3001', 10);
const host = process.env.BACKEND_HOST || '0.0.0.0';

async function main() {
	await connectPool();
	const { app } = await import('./app.js');
	app.listen(port, host, () => {
		console.log(`API en http://${host}:${port}`);
	});
}

main().catch(err => {
	console.error(err);
	process.exit(1);
});
