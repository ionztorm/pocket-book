import { db } from '@/db';
import * as schema from '@/db/schema/auth';
import { env } from '@/lib/validations/validators/env.server.validator';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { emailOTP, twoFactor } from 'better-auth/plugins';
import { resend } from './resend';

export const auth = betterAuth({
	appName: 'Pocket Book',
	database: drizzleAdapter(db, {
		provider: 'pg',

		schema: {
			...schema,
		},
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: true,
		requireEmailVerification: true,
	},
	emailVerification: {
		// sendOnSignUp: true,
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ user, url }) => {
			await resend.emails.send({
				from: 'Test <onboarding@resend.dev>',
				to: user.email,
				subject: 'Pocket Book - Verify Email',
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
	plugins: [
		twoFactor(),
		emailOTP({
			sendVerificationOnSignUp: true,
			async sendVerificationOTP({ email, otp, type }) {
				if (type === 'email-verification') {
					const { data, error } = await resend.emails.send({
						from: 'Test <onboarding@resend.dev>',
						to: email,
						subject: 'Pocket Book verification',
						html: `Your one time password is valid for 5  minutes: ${otp}`,
					});
					console.log('data: ', data);
					console.log('error: ', error);
				}
			},
		}),
		nextCookies(),
	],
});

export type Session = typeof auth.$Infer.Session;
