import { EnvironmentSchema } from '@/lib/validations/schema/env.var.schema';

export const env = EnvironmentSchema.parse(process.env);
