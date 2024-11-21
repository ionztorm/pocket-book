import { config } from 'dotenv';
import { envSchema } from '@/lib/validations/schema/env.var.schema';

// NOTE: ensure .env is loaded
config();

export const env = envSchema.parse(process.env);
