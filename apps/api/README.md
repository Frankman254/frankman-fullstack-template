# Backend API

API mínima con **Express**, **TypeScript** y **Microsoft SQL Server** (paquete `mssql`).

## Arranque

1. `server.ts` carga `.env`, llama a `connectPool()` y luego importa `app.ts`.
2. Las rutas usan `getPool()` para obtener el `ConnectionPool` ya conectado.

## Archivos clave

| Archivo | Rol |
|---------|-----|
| `server.ts` | Conecta a SQL Server y pone Express a escuchar. |
| `app.ts` | Middlewares y rutas HTTP. |
| `db/pool.ts` | Configuración y pool `mssql`. |
| `db/schema.sql` | T-SQL de ejemplo (`dbo.projects`, `dbo.tasks`). |
| `db/run-schema.ts` | Aplica `schema.sql` (`npm run db:schema`). |

## Variables de entorno

Ver `.env.example` en la raíz del monorepo: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_ENCRYPT`, `DB_TRUST_SERVER_CERTIFICATE`, `BACKEND_PORT`, etc.

## Consultas

Ejemplo con parámetro:

```ts
const pool = getPool();
const result = await pool
  .request()
  .input('id', sql.Int, projectId)
  .query('SELECT ... WHERE project_id = @id');
// result.recordset
```
