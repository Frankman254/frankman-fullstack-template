-- =============================================================================
-- ESQUEMA INICIAL: proyectos (tableros) y tareas
-- Base de datos: frankman_task_fast (la que tienes en apps/api/.env)
-- Ejecutar una vez: npm run db:schema (o con psql manualmente)
-- =============================================================================

-- Borrar tablas si existen (solo en desarrollo; en producción usar migraciones)
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS projects;

-- Tabla: projects (tableros/boards)
-- Cada fila = un tablero (ej. "Board 1", "Personal", "Trabajo")
CREATE TABLE projects (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabla: tasks (tareas/cards)
-- Cada fila = una tarea dentro de un tablero. position ordena las cards en el board
CREATE TABLE tasks (
  id         SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title      VARCHAR(500) NOT NULL,
  description TEXT,
  position   INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índice: listar tareas de un proyecto rápido
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
-- Índice: ordenar por position
CREATE INDEX idx_tasks_position ON tasks(project_id, position);

-- Trigger: actualizar updated_at al modificar (opcional pero buena práctica)
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

CREATE TRIGGER tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

-- Datos de ejemplo (opcional: quitar si prefieres empezar vacío)
INSERT INTO projects (name, description) VALUES
  ('Board 1', 'Primer tablero'),
  ('Board 2', 'Segundo tablero');

INSERT INTO tasks (project_id, title, description, position) VALUES
  (1, 'Card 1', 'Card 1 description', 0),
  (1, 'Card 2', 'Card 2 description', 1),
  (1, 'Card 3', 'Card 3 description', 2),
  (1, 'Card 4', 'Card 4 description', 3);
