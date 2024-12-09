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
	// emailAndPassword: {
	// 	enabled: true,
	// },
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
					const { data, error } = await resend.emails.send({
						from: 'Test <onboarding@resend.dev>',
						to: email,
						subject: 'Your One-Time-Password for Pocket Book',
						html: `Your one time password is valid for 5  minutes: ${otp}`,
					});
					console.log('data: ', data);
					console.log('error: ', error);
				}
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
	],
});
