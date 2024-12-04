import { db } from '@/db';
import * as schema from '@/db/schema/auth';
import { env } from '@/lib/validations/validators/env.server.validator';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { resend } from './resend';

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
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ user, url }) => {
			await resend.emails.send({
				from: 'Acme <onboarding@resend.dev>', // You could add your custom domain
				to: user.email, // email of the user to want to end
				subject: 'Email Verification', // Main subject of the email
				html: `Click the link to verify your email: ${url}`,
			});
		},
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
	plugins: [nextCookies()],
});
