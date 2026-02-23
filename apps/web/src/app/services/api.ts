/**
 * Servicio de API: solo lógica de red (fetch, URLs, parseo).
 * No usa React (useState, useEffect). Solo funciones puras o async.
 * Así la lógica se puede reutilizar o testear sin componentes.
 */

import { FRONTEND_CONFIG } from '../../config';

export const getBaseUrl = () => FRONTEND_CONFIG.apiBaseUrl ?? '';

export type TestDbSuccess = {
	current_time: string;
	postgres_version: string;
	connectionString?: string;
};

export type TestDbResponse =
	| { status: 'success'; data: TestDbSuccess }
	| { status: 'error'; message?: string; error?: string };

/**
 * Llama a GET /api/test-db y devuelve la respuesta tipada.
 * Lanza si hay error de red o respuesta no OK.
 */
export async function testDbConnection(): Promise<TestDbResponse> {
	const baseUrl = getBaseUrl();
	const res = await fetch(`${baseUrl}/api/test-db`);
	const json = (await res.json()) as TestDbResponse;

	if (!res.ok) {
		const err = json as { message?: string; error?: string };
		throw new Error(err.message ?? err.error ?? 'Error desconocido');
	}
	return json;
}
