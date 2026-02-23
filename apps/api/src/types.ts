/**
 * Tipos de la API (proyectos y tareas). Mantener en sync con shared/types.ts.
 * El frontend usa shared/types.ts; la API usa este archivo para no romper rootDir al compilar.
 */

export interface Project {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: number;
  project_id: number;
  title: string;
  description: string | null;
  position: number;
  created_at: string;
  updated_at: string;
}
