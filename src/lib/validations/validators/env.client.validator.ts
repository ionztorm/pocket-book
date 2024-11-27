import { EnvironmentSchema } from '@/lib/validations/schema/env.var.schema';

export const clientEnv = EnvironmentSchema.parse({
	DATABASE_URL: process.env['DATABASE_URL'],
});
