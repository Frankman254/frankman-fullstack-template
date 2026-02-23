/**
 * Tipos compartidos entre frontend (apps/web) y backend (apps/api).
 * Representan las entidades de la base de datos y los contratos de la API.
 *
 * Importar desde api:  import type { Project, Task } from '@shared/types'
 * Importar desde web:  import type { Project, Task } from '@shared/types'
 * (requiere alias en tsconfig y en vite.config)
 */

// ----- Entidades (lo que guardamos en la DB) -----

/** Proyecto / Tablero (Board). Agrupa tareas. */
export interface Project {
  id: number;
  name: string;
  description: string | null;
  created_at: string; // ISO date
  updated_at: string;
}

/** Tarea (Card). Pertenece a un proyecto. */
export interface Task {
  id: number;
  project_id: number;
  title: string;
  description: string | null;
  position: number; // orden dentro del tablero
  created_at: string;
  updated_at: string;
}

// ----- Request bodies (lo que envía el cliente al crear/actualizar) -----

export interface CreateProjectRequest {
  name: string;
  description?: string | null;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string | null;
}

export interface CreateTaskRequest {
  project_id: number;
  title: string;
  description?: string | null;
  position: number;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string | null;
  position?: number;
  project_id?: number;
}
