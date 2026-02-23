/**
 * ENTRADA DEL SERVIDOR (PUNTO DE ARRANQUE)
 * -----------------------------------------
 * Este es el archivo que ejecutas con "npm run dev".
 * Solo hace dos cosas: cargar variables de entorno y poner la app a escuchar en un puerto.
 */

import 'dotenv/config'; // Primero cargar .env para que process.env tenga DB_HOST, etc.
import { app } from './app.js';

const port = parseInt(process.env.BACKEND_PORT || '3001', 10);
const host = process.env.BACKEND_HOST || '0.0.0.0'; // 0.0.0.0 = aceptar conexiones por IP y localhost

// app.listen(puerto, host, callback) inicia el servidor HTTP.
// Cuando alguien hace una petición a http://localhost:3001/..., Express la recibe y la pasa a las rutas de app.ts.
app.listen(port, host, () => {
	console.log(`🚀 API en http://${host}:${port}`);
});
