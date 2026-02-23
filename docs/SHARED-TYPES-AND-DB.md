# Tipos compartidos y base de datos

Guía para entender y repetir lo que hicimos: tipos compartidos (Project, Task) y tablas en PostgreSQL.

---

## 1. Por qué tipos compartidos

- **Frontend** y **backend** hablan del mismo “contrato”: mismos nombres de campos y mismos tipos.
- Si cambias un campo en la API, TypeScript avisa en el frontend si algo deja de cuadrar.
- Un solo sitio donde se definen las entidades: `shared/types.ts`.

---

## 2. Dónde está cada cosa

| Qué | Dónde |
|-----|--------|
| Tipos (Project, Task, CreateX, UpdateX) | `shared/types.ts` (raíz del repo) |
| Esquema SQL (CREATE TABLE) | `apps/api/src/db/schema.sql` |
| Script que aplica el schema | `apps/api/src/db/run-schema.ts` |
| Uso en API | `import type { Project, Task } from './types.js'` en `apps/api/src` (copia en `apps/api/src/types.ts`; mantener igual que `shared/types.ts`) |
| Uso en web | `import type { Project, Task } from '@shared/types'` (alias en `tsconfig` + `vite.config`) |

---

## 3. Cómo se crean las tablas en PostgreSQL

### Paso a paso

1. **Tener PostgreSQL en marcha** y la base creada (la que usas en `apps/api/.env`: `DB_NAME=frankman_task_fast`).

2. **Definir el schema en SQL** (`apps/api/src/db/schema.sql`):
   - `DROP TABLE IF EXISTS tasks;` y `projects` para poder volver a ejecutar el script sin errores.
   - `CREATE TABLE projects (...)` con columnas: `id` (SERIAL), `name`, `description`, `created_at`, `updated_at`.
   - `CREATE TABLE tasks (...)` con `project_id` (FK a `projects`), `title`, `description`, `position`, fechas.
   - `REFERENCES projects(id) ON DELETE CASCADE`: si borras un proyecto, se borran sus tareas.
   - Índices en `project_id` y `(project_id, position)` para listar y ordenar rápido.
   - Trigger/función para actualizar `updated_at` en cada UPDATE.

3. **Ejecutar el schema** una vez (o cuando cambies el SQL):
   ```bash
   npm run db:schema
   ```
   Eso lee `schema.sql` y ejecuta todo el SQL contra la base usando el pool de `apps/api` (variables de `apps/api/.env`).

### Cómo hacerlo tú en el futuro

- Crea o edita un `.sql` (por ejemplo `schema.sql` o `migrations/002_nueva_tabla.sql`).
- Escribe `CREATE TABLE`, `ALTER TABLE`, etc., con la misma convención (snake_case, `created_at`/`updated_at` si quieres).
- Ejecútalo:
  - Con el script: pon el contenido en un archivo y en `run-schema.ts` cambia el path al nuevo archivo (o añade un script `db:migrate` que ejecute otro .sql).
  - O con `psql`: `psql -U postgres -d frankman_task_fast -f apps/api/src/db/schema.sql`.

---

## 4. Cómo encajan los tipos con la base de datos

- En PostgreSQL las columnas son **snake_case** (`project_id`, `created_at`).
- En TypeScript usamos los **mismos nombres** en las interfaces para que las filas que devuelve `pg` coincidan con el tipo:

```ts
// shared/types.ts
export interface Project {
  id: number;
  name: string;
  description: string | null;
  created_at: string;  // ISO desde la DB
  updated_at: string;
}
```

- En la API: `pool.query<Project>('SELECT ...')` y `result.rows` quedan tipados como `Project[]`.
- En el frontend: al hacer `fetch('/api/projects')` y parsear el JSON, puedes tipar la respuesta con `Project[]` para tener autocompletado y comprobaciones.

---

## 5. Resumen de comandos

```bash
# Crear / actualizar tablas (ejecuta schema.sql)
npm run db:schema
```

Rutas de ejemplo que ya usan los tipos y la DB:

- `GET /api/projects` → lista de tableros (Project[]).
- `GET /api/projects/:id/tasks` → tareas de un tablero (Task[]).

Si añades más tablas o columnas, actualiza `shared/types.ts` y el SQL para que sigan alineados.
