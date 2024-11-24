import { defineConfig } from 'drizzle-kit';
import { env } from '@/lib/validations/validators/env.server.validator';
import './envConfig';

export default defineConfig({
	schema: './src/db/schema',
	out: './src/db/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	casing: 'snake_case',
});
