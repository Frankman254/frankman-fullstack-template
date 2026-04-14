-- =============================================================================
-- Esquema inicial (SQL Server): proyectos y tareas de ejemplo
-- Crea antes la base: CREATE DATABASE app_dev;  y usa DB_NAME=app_dev en .env
-- Aplicar: npm run db:schema
-- =============================================================================

IF OBJECT_ID(N'dbo.tasks', N'U') IS NOT NULL DROP TABLE dbo.tasks;
IF OBJECT_ID(N'dbo.projects', N'U') IS NOT NULL DROP TABLE dbo.projects;

CREATE TABLE dbo.projects (
  id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  name NVARCHAR(255) NOT NULL,
  description NVARCHAR(MAX) NULL,
  created_at DATETIME2(7) NOT NULL CONSTRAINT DF_projects_created DEFAULT SYSUTCDATETIME(),
  updated_at DATETIME2(7) NOT NULL CONSTRAINT DF_projects_updated DEFAULT SYSUTCDATETIME()
);

CREATE TABLE dbo.tasks (
  id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  project_id INT NOT NULL,
  title NVARCHAR(500) NOT NULL,
  description NVARCHAR(MAX) NULL,
  position INT NOT NULL CONSTRAINT DF_tasks_position DEFAULT 0,
  created_at DATETIME2(7) NOT NULL CONSTRAINT DF_tasks_created DEFAULT SYSUTCDATETIME(),
  updated_at DATETIME2(7) NOT NULL CONSTRAINT DF_tasks_updated DEFAULT SYSUTCDATETIME(),
  CONSTRAINT FK_tasks_projects FOREIGN KEY (project_id) REFERENCES dbo.projects(id) ON DELETE CASCADE
);

CREATE INDEX idx_tasks_project_id ON dbo.tasks(project_id);
CREATE INDEX idx_tasks_position ON dbo.tasks(project_id, position);

INSERT INTO dbo.projects (name, description) VALUES
  (N'Board 1', N'Primer tablero'),
  (N'Board 2', N'Segundo tablero');

INSERT INTO dbo.tasks (project_id, title, description, position) VALUES
  (1, N'Card 1', N'Card 1 description', 0),
  (1, N'Card 2', N'Card 2 description', 1),
  (1, N'Card 3', N'Card 3 description', 2),
  (1, N'Card 4', N'Card 4 description', 3);
