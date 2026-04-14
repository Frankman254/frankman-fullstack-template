# Base de datos (Microsoft SQL Server)

## Aplicar el esquema

Desde la raíz del monorepo (con SQL Server en marcha y base `DB_NAME` creada):

```bash
npm run db:schema
```

O solo el workspace de la API:

```bash
npm run db:schema --workspace=@fullstack-starter/api
```

Eso ejecuta `schema.sql` (T-SQL: tablas `dbo.projects` y `dbo.tasks`) usando las variables `DB_*` del `.env` en la raíz.

## Tipos TypeScript

Los tipos equivalentes están en `@fullstack-starter/shared` (`packages/shared`, entidades `Project`, `Task`).
