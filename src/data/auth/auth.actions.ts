'use server';

import { signIn } from '@/auth';
import type { AuthLoginProviders } from '@/lib/types/auth/auth.types';

export const login = async (provider: AuthLoginProviders) => await signIn(provider);
