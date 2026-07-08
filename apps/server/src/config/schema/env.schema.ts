import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'staging']),

  PORT: z.coerce.number().int().positive(),

  APP_NAME: z.string().min(1),

  FRONTEND_URL: z.url(),
});

export function validate(config: Record<string, unknown>) {
  return envSchema.parse(config);
}
