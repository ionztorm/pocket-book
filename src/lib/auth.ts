import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db';
import * as schema from '@/db/schema/auth';
import { env } from '@/lib/validations/validators/env.server.validator';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',

		schema: {
			...schema,
		},
	}),
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		google: {
			clientId: env.AUTH_GOOGLE_ID,
			clientSecret: env.AUTH_GOOGLE_SECRET,
		},
	},
});
