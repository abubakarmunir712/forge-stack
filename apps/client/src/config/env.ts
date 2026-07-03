import { envSchema } from '@/schema/env.schema';

const parsed = envSchema.parse(import.meta.env);
export const env = {
  APP_NAME: parsed.VITE_APP_NAME,
  API_URL: parsed.VITE_API_URL,
  APP_ENV: parsed.VITE_APP_ENV,
} as const;
