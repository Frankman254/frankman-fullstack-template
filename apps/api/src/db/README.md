# Base de datos (PostgreSQL)

## Cómo crear las tablas (primera vez o tras cambios en el schema)

Desde la raíz del monorepo:

```bash
cd apps/api
npm run db:schema
```

O desde la raíz:

```bash
npm run db:schema --workspace=@frankman-task-fast/api
```

Eso ejecuta `schema.sql` contra la base definida en `apps/api/.env` (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT).

## Estructura del schema

- **projects**: tableros (boards). Columnas: `id`, `name`, `description`, `created_at`, `updated_at`.
- **tasks**: tareas (cards) de un tablero. Columnas: `id`, `project_id` (FK a projects), `title`, `description`, `position`, `created_at`, `updated_at`.
- **Triggers**: al hacer UPDATE en una fila, `updated_at` se actualiza solo.

Los tipos TypeScript equivalentes están en `shared/types.ts` (Project, Task) para usarlos en API y frontend.
