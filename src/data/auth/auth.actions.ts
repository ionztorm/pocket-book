'use server';

import { authClient } from '@/lib/auth-client';
import type { AuthLoginProviders } from '@/lib/types/auth/auth.types';

export const login = async (provider: AuthLoginProviders) => {
	await authClient.signIn.social(
		{ provider, disableRedirect: false },
		{ onSuccess: () => console.log('logged in with ', provider) },
	);
};
//export const register = async (provider: AuthLoginProviders) => await authClient.signUp({ provider})
