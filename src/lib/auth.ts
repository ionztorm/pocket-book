import { db } from '@/db';
import * as schema from '@/db/schema/auth';
import { env } from '@/lib/validations/validators/env.server.validator';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',

		schema: {
			...schema,
		},
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: true,
		requireEmailVerification: false,
	},
	socialProviders: {
		google: {
			clientId: env.AUTH_GOOGLE_ID,
			clientSecret: env.AUTH_GOOGLE_SECRET,
		},
		github: {
			clientId: env.AUTH_GITHUB_ID,
			clientSecret: env.AUTH_GITHUB_SECRET,
		},
	},
	plugins: [
		nextCookies(),
		userInputValidation([{ path: '/auth/', validator: inputValidator(SignupSchema) }]),
	],
});
