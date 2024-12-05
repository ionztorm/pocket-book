import { db } from '@/db';
import * as schema from '@/db/schema/auth';
import { env } from '@/lib/validations/validators/env.server.validator';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { emailOTP } from 'better-auth/plugins';
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
		emailOTP({
			async sendVerificationOTP({ email, otp, type }) {
				if (type === 'sign-in') {
					await resend.emails.send({
						from: 'Test <onboarding@resend.dev>',
						to: email,
						subject: 'Your One-Time-Password for Pocket Book',
						html: `Your one time password is valid for 5  minutes: ${otp}`,
					});
				} else {
					await resend.emails.send({
						from: 'Test <onboarding@resend.dev>',
						to: email,
						subject: 'Pocket Book - Verify your email address',
						html: `Thanks for choosing Pocket Book. You need to verify your email. Please proceed to login using this one-time-password: ${otp}. Your password is valid for 5 minutes.`,
					});
				}
			},
		}),
	],
});
