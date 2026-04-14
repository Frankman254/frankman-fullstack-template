/**
 * Aplicación Express: middlewares y rutas HTTP.
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import type { Project, Task } from '@fullstack-starter/shared';
import { getConnectionSummary, getPool, sql } from './db/pool.js';
import { getCorsOrigins, isProduction } from './env.js';

const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(
	cors({
		origin: getCorsOrigins(),
		credentials: true,
	})
);
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
	res.json({ status: 'ok' });
});

app.get('/api/test-db', async (_req, res) => {
	try {
		const pool = getPool();
		const result = await pool.request().query<{
			current_time: Date;
			sql_version: string;
		}>(`
			SELECT SYSUTCDATETIME() AS [current_time],
			       @@VERSION AS [sql_version]
		`);
		const row = result.recordset[0];
		if (!row) {
			res.status(500).json({
				status: 'error',
				message: 'Consulta de prueba sin filas',
			});
			return;
		}
		res.json({
			status: 'success',
			data: {
				current_time: row.current_time,
				sql_version: row.sql_version,
				...(isProduction
					? {}
					: { connectionString: getConnectionSummary() }),
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			status: 'error',
			message:
				error instanceof Error ? error.message : 'Error desconocido',
		});
	}
});

app.get('/api/projects', async (_req, res) => {
	try {
		const pool = getPool();
		const result = await pool
			.request()
			.query<Project>(
				'SELECT id, name, description, created_at, updated_at FROM dbo.projects ORDER BY id'
			);
		res.json({ status: 'success', data: result.recordset });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			status: 'error',
			message:
				error instanceof Error ? error.message : 'Error desconocido',
		});
	}
});

app.get('/api/projects/:id/tasks', async (req, res) => {
	try {
		const projectId = parseInt(req.params.id, 10);
		if (Number.isNaN(projectId)) {
			res.status(400).json({
				status: 'error',
				message: 'ID de proyecto inválido',
			});
			return;
		}
		const pool = getPool();
		const result = await pool
			.request()
			.input('projectId', sql.Int, projectId)
			.query<Task>(
				`SELECT id, project_id, title, description, position, created_at, updated_at
				 FROM dbo.tasks WHERE project_id = @projectId ORDER BY position`
			);
		res.json({ status: 'success', data: result.recordset });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			status: 'error',
			message:
				error instanceof Error ? error.message : 'Error desconocido',
		});
	}
});

app.use((_req, res) => {
	res.status(404).json({ error: 'Ruta no encontrada' });
});

export { app };
