import { createAuthClient } from 'better-auth/react';
import { z } from 'zod';

const publicEnvSchema = z.object({
	NEXT_PUBLIC_APP_URL: z.string().url(),
});

const clientEnv = publicEnvSchema.parse({
	NEXT_PUBLIC_APP_URL: process.env['NEXT_PUBLIC_APP_URL'],
});

export const authClient = createAuthClient({
	baseURL: clientEnv.NEXT_PUBLIC_APP_URL,
});
