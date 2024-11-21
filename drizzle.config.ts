import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';
import { env } from '@/lib/validations/validators/env.server.validator';

// NOTE: ensure .env is loaded
config();

export default defineConfig({
	schema: './src/db/schema.ts',
	out: './src/db/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
