import { emailOTPClient, twoFactorClient } from 'better-auth/client/plugins';
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
	plugins: [emailOTPClient(), twoFactorClient()],
});

export type ClientSession = typeof authClient.$Infer.Session;
