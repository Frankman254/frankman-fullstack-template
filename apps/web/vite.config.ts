import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [react()],
		resolve: {
			alias: { '@shared': path.resolve(__dirname, '../../shared') },
		},
		server: {
			port: parseInt(env.FRONTEND_PORT || '5173'),
			host: true,
			strictPort: true, // Falla si el puerto está ocupado
		},
		define: {
			__APP_NAME__: JSON.stringify(env.APP_NAME || 'FrankmanTaskFast'),
			__API_URL__: JSON.stringify(
				env.API_BASE_URL || 'http://localhost:3001'
			),
		},
	};
});
