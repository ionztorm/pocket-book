import { z } from 'zod';
import { envSchema } from '@/lib/validations/env.var.schema';

export type Env = z.infer<typeof envSchema>;
