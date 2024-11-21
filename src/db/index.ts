import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { env } from '@/lib/validations/validators/env.server.validator';

config({
	path: '.env',
});

const sql = neon(env.DATABASE_URL);

/*
 * NOTE:
 * export const db = drizzle(sql, { logger: true });
 */

export const db = drizzle(sql);
