import { env } from '@/lib/validations/validators/env.server.validator';
import { drizzle } from 'drizzle-orm/neon-http';

export const db = drizzle({ connection: env.DATABASE_URL, casing: 'snake_case' });
