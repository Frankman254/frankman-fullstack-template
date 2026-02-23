/**
 * CONEXIÓN A POSTGRESQL
 * ---------------------
 * Este archivo crea un "pool" (grupo de conexiones) a la base de datos.
 * Usamos un pool para no abrir/cerrar una conexión en cada request;
 * el pool reutiliza conexiones y así la API va más rápido.
 */

import 'dotenv/config'; // Lee el archivo .env y pone las variables en process.env
import { Pool } from 'pg'; // Pool es la clase del paquete "pg" para conectar a PostgreSQL

// Cadena de conexión: "postgresql://usuario:contraseña@servidor:puerto/nombre_base"
// Exportada solo para pruebas (ej. mostrarla en el frontend); en producción no exponer.
export const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
// Creamos el pool con esa cadena. Lo exportamos para usarlo en las rutas (app.ts).
export const pool = new Pool({
	connectionString,
	ssl: false, // En desarrollo no usamos SSL; en producción suele ser true
});

// Opcional: escuchar eventos del pool para ver en consola cuándo hay conexión o error
pool.on('connect', () => console.log('📦 Conectado a PostgreSQL'));
pool.on('error', err => console.error('❌ Error de base de datos:', err));
