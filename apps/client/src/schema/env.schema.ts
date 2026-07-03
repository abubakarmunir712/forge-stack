import z from 'zod';

export const envSchema = z.object({
  VITE_APP_NAME: z.string(),
  VITE_API_URL: z.url(),
  VITE_APP_ENV: z.enum(['development', 'production', 'staging']),
});
