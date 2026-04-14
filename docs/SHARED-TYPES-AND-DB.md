# Tipos compartidos y base de datos (SQL Server)

Guía breve: contratos TypeScript alineados con tablas en **Microsoft SQL Server**.

---

## 1. Por qué tipos compartidos

- Frontend y backend comparten el mismo contrato de datos.
- Si cambias columnas o la forma del JSON de la API, TypeScript ayuda a detectar desajustes.

---

## 2. Dónde está cada cosa

| Qué | Dónde |
|-----|--------|
| Tipos (Project, Task, DTOs) | `packages/shared` → `@fullstack-starter/shared` |
| Esquema T-SQL | `apps/api/src/db/schema.sql` |
| Script que aplica el schema | `apps/api/src/db/run-schema.ts` |
| Uso en API | `import type { ... } from '@fullstack-starter/shared'` |
| Uso en web | Igual, con resolución vía workspace + alias en `vite.config` |

---

## 3. Crear tablas

1. Instancia SQL Server accesible (`DB_HOST`, `DB_PORT`, usuario/contraseña).
2. Base creada: `CREATE DATABASE app_dev;` (o el nombre que pongas en `DB_NAME`).
3. `npm run db:schema` desde la raíz del repo.

---

## 4. Tipos y columnas

- En SQL Server las columnas siguen **snake_case** (`project_id`, `created_at`) para coincidir con las interfaces y con lo que devuelve el driver al serializar a JSON.

---

## 5. Comandos

```bash
npm run db:schema
```

Rutas de ejemplo:

- `GET /api/projects`
- `GET /api/projects/:id/tasks`

Si añades tablas o columnas, actualiza `packages/shared` y `schema.sql` en conjunto.
