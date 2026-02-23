/**
 * APLICACIÓN EXPRESS (LAS RUTAS DE LA API)
 * -----------------------------------------
 * Aquí definimos qué hace el servidor cuando recibe una petición HTTP.
 * Express es la librería que nos permite decir: "cuando alguien pida GET /health, responde con esto".
 */

import express from 'express';
import cors from 'cors';
import type { Project, Task } from './types.js';
import { pool, connectionString } from './db/pool.js';

// Crear la "app": es el servidor Express. Todas las rutas se añaden a esta app.
const app = express();

// --- MIDDLEWARES (se ejecutan en cada petición, en orden) ---
// cors(): permite que el frontend (otro puerto, ej. 3000) pueda llamar a esta API.
// express.json(): si el cliente manda JSON en el body, lo parsea y lo deja en req.body.
app.use(cors());
app.use(express.json());

// --- RUTAS ---

// GET /health → Solo comprobar que la API está viva. No toca la base de datos.
// req = petición, res = respuesta. res.json() envía un objeto como JSON y cierra la respuesta.
app.get('/health', (_req, res) => {
	res.json({ status: 'ok', message: 'API funcionando mi rey punto tevé' });
});
// prueba de ruta
app.get('/kenub', (_req, res) => {
	res.json({ status: 'ok', message: 'PERO KE NOOB XD' });
});

// GET /api/test-db → Prueba la conexión a PostgreSQL.
// Es async porque pool.query() devuelve una Promise (operación que tarda).
app.get('/api/test-db', async (_req, res) => {
	try {
		// pool.query('SQL') ejecuta la consulta. result.rows es el array de filas.
		const result = await pool.query(
			'SELECT NOW() as current_time, version() as postgres_version'
		);
		res.json({
			status: 'success',
			data: {
				...result.rows[0],
				connectionString,
				// Solo para pruebas: mostrar en frontend. En producción quitar.
			},
		});
	} catch (error) {
		// Si la consulta falla (ej. base apagada), entramos aquí.
		console.error(error);
		res.status(500).json({
			status: 'error',
			message:
				error instanceof Error ? error.message : 'Error desconocido',
		});
	}
});

// GET /api/projects → Lista todos los tableros (proyectos). Usa el tipo compartido Project.
app.get('/api/projects', async (_req, res) => {
	try {
		const result = await pool.query<Project>(
			'SELECT id, name, description, created_at, updated_at FROM projects ORDER BY id'
		);
		res.json({ status: 'success', data: result.rows });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			status: 'error',
			message: error instanceof Error ? error.message : 'Error desconocido',
		});
	}
});

// GET /api/projects/:id/tasks → Tareas de un tablero. Usa el tipo compartido Task.
app.get('/api/projects/:id/tasks', async (req, res) => {
	try {
		const projectId = parseInt(req.params.id, 10);
		if (Number.isNaN(projectId)) {
			res.status(400).json({ status: 'error', message: 'ID de proyecto inválido' });
			return;
		}
		const result = await pool.query<Task>(
			'SELECT id, project_id, title, description, position, created_at, updated_at FROM tasks WHERE project_id = $1 ORDER BY position',
			[projectId]
		);
		res.json({ status: 'success', data: result.rows });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			status: 'error',
			message: error instanceof Error ? error.message : 'Error desconocido',
		});
	}
});

// Si no coincide ninguna ruta anterior, respondemos 404.
app.use((_req, res) => {
	res.status(404).json({ error: 'Ruta no encontrada rey punto tevé' });
});

// Exportamos app para que server.ts pueda hacer app.listen(...).
export { app };
