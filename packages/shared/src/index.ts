/**
 * Contratos y entidades compartidas entre `apps/web` y `apps/api`.
 * Sustituye o amplía estos tipos cuando definas tu propio dominio.
 */

/** Proyecto / tablero. Agrupa tareas (ejemplo de dominio). */
export interface Project {
	id: number;
	name: string;
	description: string | null;
	created_at: string;
	updated_at: string;
}

/** Tarea asociada a un proyecto. */
export interface Task {
	id: number;
	project_id: number;
	title: string;
	description: string | null;
	position: number;
	created_at: string;
	updated_at: string;
}

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
