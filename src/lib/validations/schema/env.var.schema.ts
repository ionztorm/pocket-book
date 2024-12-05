import { z } from 'zod';

export const EnvironmentSchema = z.object({
	DATABASE_URL: z.string(),
	BETTER_AUTH_SECRET: z.string(),
	NEXT_PUBLIC_APP_URL: z.string().url(),
	AUTH_GOOGLE_ID: z.string(),
	AUTH_GOOGLE_SECRET: z.string(),
	AUTH_GITHUB_ID: z.string(),
	AUTH_GITHUB_SECRET: z.string(),
	RESEND_KEY: z.string(),
	ENV: z.enum(['development', 'testing', 'production']),
});

declare global {
	interface ProcessEnv {
		DATABASE_URL: string;
		BETTER_AUTH_SECRET: string;
		NEXT_PUBLIC_APP_URL: string;
		AUTH_GOOGLE_ID: string;
		AUTH_GOOGLE_SECRET: string;
		AUTH_GITHUB_ID: string;
		AUTH_GITHUB_SECRET: string;
		RESEND_KEY: string;
		ENV: 'development' | 'testing' | 'production';
	}
}
