import { createAuthClient } from 'better-auth/react';
import { env } from '@/lib/validations/validators/env.server.validator';

export const authClient = createAuthClient({
	baseURL: process.env.baseURL,
});
