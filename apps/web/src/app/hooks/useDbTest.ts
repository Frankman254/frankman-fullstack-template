/**
 * Hook: encapsula estado (idle/loading/success/error) y la acción de probar la DB.
 * Usa el servicio api.testDbConnection(); el componente solo consume resultado y dispara la acción.
 */

import { useState, useCallback } from 'react';
import { testDbConnection, type TestDbSuccess } from '../services/api';

export type DbTestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: TestDbSuccess }
  | { status: 'error'; message: string };

export function useDbTest() {
  const [state, setState] = useState<DbTestState>({ status: 'idle' });

  const runTest = useCallback(async () => {
    setState({ status: 'loading' });
    try {
      const json = await testDbConnection();
      if (json.status === 'success') {
        setState({ status: 'success', data: json.data });
      } else {
        setState({
          status: 'error',
          message: json.message ?? json.error ?? 'Error desconocido',
        });
      }
    } catch (err) {
      setState({
        status: 'error',
        message: err instanceof Error ? err.message : 'No se pudo conectar al backend',
      });
    }
  }, []);

  return {
    state,
    isLoading: state.status === 'loading',
    runTest,
  };
}
