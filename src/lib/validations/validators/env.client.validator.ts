import { envSchema } from '@/lib/validations/schema/env.var.schema';

export const clientEnv = envSchema.parse({
	DATABASE_URL: process.env['DATABASE_URL'],
});
