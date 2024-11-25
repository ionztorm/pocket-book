import { z } from 'zod';

export const envSchema = z.object({
	DATABASE_URL: z.string().min(1),
	BETTER_AUTH_SECRET: z.string().min(1),
	BETTER_AUTH_URL: z.string().url().min(1),
	AUTH_GOOGLE_ID: z.string().min(1),
	AUTH_GOOGLE_SECRET: z.string().min(1),
});
