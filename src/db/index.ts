//import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { env } from '@/lib/validations/validators/env.server.validator';

//config({
//	path: '.env',
//});

/*
 * NOTE:
 * export const db = drizzle(sql, { logger: true });
 */

export const db = drizzle({ connection: env.DATABASE_URL, casing: 'snake_case' });
