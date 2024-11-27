import { z } from 'zod';

export const EnvironmentSchema = z.object({
	DATABASE_URL: z.string(),
	BETTER_AUTH_SECRET: z.string(),
	BETTER_AUTH_URL: z.string().url(),
	AUTH_GOOGLE_ID: z.string(),
	AUTH_GOOGLE_SECRET: z.string(),
	AUTH_GITHUB_ID: z.string(),
	AUTH_GITHUB_SECRET: z.string(),
});

declare global {
	interface ProcessEnv {
		DATABASE_URL: string;
		BETTER_AUTH_SECRET: string;
		BETTER_AUTH_URL: string;
		AUTH_GOOGLE_ID: string;
		AUTH_GOOGLE_SECRET: string;
		AUTH_GITHUB_ID: string;
		AUTH_GITHUB_SECRET: string;
		ENV: 'development' | 'testing' | 'production';
	}
}
