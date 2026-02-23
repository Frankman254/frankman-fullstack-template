/**
 * Configuración del frontend. Lee variables de apps/web/.env (prefijo VITE_).
 */

interface ViteEnv {
  VITE_APP_NAME?: string;
  VITE_APP_VERSION?: string;
  VITE_APP_DESCRIPTION?: string;
  VITE_APP_AUTHOR?: string;
  VITE_API_URL?: string;
}

const env = (typeof import.meta !== 'undefined' && import.meta.env
  ? import.meta.env
  : {}) as ViteEnv;

export const APP_CONFIG = {
  name: env.VITE_APP_NAME,
  version: env.VITE_APP_VERSION,
  description: env.VITE_APP_DESCRIPTION,
  author: env.VITE_APP_AUTHOR,
} as const;

export const FRONTEND_CONFIG = {
  apiBaseUrl: env.VITE_API_URL,
} as const;
