import { envSchema } from '@/lib/validations/schema/env.var.schema';

export const env = envSchema.parse(process.env);
