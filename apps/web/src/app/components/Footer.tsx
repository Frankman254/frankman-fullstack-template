import { APP_CONFIG } from '../../config';
import { useDbTest } from '../hooks/useDbTest';
import { getBaseUrl } from '../services/api';
export default function Footer() {
	const { state, isLoading, runTest } = useDbTest();
	return (
		<footer className="bg-gray-800 text-white py-4 w-full fixed bottom-0">
			<div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-4">
				{APP_CONFIG.name}
				<p className="text-center">Versión: {APP_CONFIG.version}</p>
				<button
					type="button"
					onClick={runTest}
					disabled={isLoading}
					className="px-3 py-1.5 rounded bg-gray-600 hover:bg-gray-500 disabled:opacity-50 text-sm"
				>
					{isLoading ? 'Probando…' : 'Probar conexión DB'}
				</button>
				{state.status === 'success' && (
					<>
						<span className="text-green-400 text-sm">
							✓ DB OK —{' '}
							{state.data.postgres_version?.split(' ')[0]}{' '}
							{state.data.postgres_version?.split(' ')[1]} · API:{' '}
							{getBaseUrl()}
						</span>
						{state.data.connectionString && (
							<span
								className="text-gray-400 text-xs block mt-1"
								title="Solo pruebas"
							>
								{/* {state.data.connectionString} */}
							</span>
						)}
					</>
				)}
				{state.status === 'error' && (
					<span
						className="text-red-400 text-sm"
						title={state.message}
					>
						✗ Error: {state.message}
					</span>
				)}
			</div>
		</footer>
	);
}
