# Backend API (para aprender)

API mínima con **Express** + **PostgreSQL**. Solo tres archivos importantes.

## Cómo se ejecuta todo (orden real)

1. Ejecutas `npm run dev` → Node arranca **server.ts**.
2. **server.ts** carga `.env` (variables de entorno) e importa **app.ts**.
3. Hace `app.listen(3001)` → el servidor HTTP queda escuchando en el puerto 3001.
4. Cuando llega una petición (ej. `GET http://localhost:3001/health`), Express la pasa a **app.ts**.
5. En **app.ts** se comprueba la URL y el método (GET/POST…) y se ejecuta la ruta que coincida.
6. Si la ruta necesita datos, usa **pool** (de **db/pool.ts**) para hacer `pool.query('SELECT ...')` contra PostgreSQL.

## Qué hace cada archivo

| Archivo      | Qué hace en una frase |
|-------------|------------------------|
| **server.ts** | Arranca el servidor en un puerto (punto de entrada). |
| **app.ts**    | Define las rutas (GET /health, GET /api/test-db) y los middlewares. |
| **db/pool.ts**| Crea la conexión a PostgreSQL y exporta `pool` para hacer consultas. |

## Conceptos que debes conocer

- **Express**: librería para crear un servidor HTTP y definir rutas (URL + método → respuesta).
- **Ruta**: `app.get('/ruta', (req, res) => { ... })` = “cuando pidan GET /ruta, ejecuta esta función”.
- **Middleware**: función que se ejecuta en cada petición (ej. `cors()`, `express.json()`).
- **pool.query('SQL')**: ejecuta una consulta SQL en PostgreSQL y devuelve una Promise con `rows`.
- **res.json(objeto)**: envía al cliente una respuesta en JSON y cierra la petición.
- **res.status(500)**: indica código HTTP (ej. 500 = error del servidor).

## Cómo añadir una ruta nueva (ejemplo)

En **app.ts**, después de las rutas que ya hay:

```ts
// GET /api/ejemplo → devuelve un mensaje
app.get('/api/ejemplo', (_req, res) => {
  res.json({ mensaje: 'Hola desde la API' });
});
```

Para una ruta que consulte la base de datos:

```ts
app.get('/api/usuarios', async (_req, res) => {
  try {
    const result = await pool.query('SELECT id, nombre FROM usuarios');
    res.json({ data: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al leer la base de datos' });
  }
});
```

Guarda, reinicia `npm run dev` y prueba con el navegador o con el botón “Probar conexión DB” del frontend (para /api/test-db).

## Variables de entorno (.env)

Si existe un `.env` en la raíz del monorepo o en `apps/api`, el backend usa por ejemplo:

- `BACKEND_PORT` → puerto donde escucha la API (por defecto 3001).
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` → conexión a PostgreSQL.
- O una sola variable `DATABASE_URL` con la URL completa de conexión.

Así puedes cambiar credenciales o puerto sin tocar el código.
