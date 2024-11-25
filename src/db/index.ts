import { drizzle } from 'drizzle-orm/neon-http';
import { env } from '@/lib/validations/validators/env.server.validator';

export const db = drizzle({ connection: env.DATABASE_URL, casing: 'snake_case' });
