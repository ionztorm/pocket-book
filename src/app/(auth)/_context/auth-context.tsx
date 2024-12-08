'use client';

import type {
	TAuthenticationContext,
	TAuthenticationContextProviderProps,
} from '@/lib/types/auth/auth.types';
import type { Email } from '@/lib/types/validation.types';
import { createContext, useContext, useMemo, useState } from 'react';

const AuthenticationContext = createContext<TAuthenticationContext | null>(null);

const AuthenticationContextProvider = ({ children }: TAuthenticationContextProviderProps) => {
	const [email, setEmail] = useState<Email['email'] | null>(null);

	const values = useMemo(() => ({ email, setEmail }), [email]);

	return <AuthenticationContext.Provider value={values}>{children}</AuthenticationContext.Provider>;
};

const useAuthenticationContext = () => {
	const value = useContext(AuthenticationContext);
	if (!value)
		throw new Error(
			'You have used AuthenticationContext outside of its Provider. AuthenticationContext can only be used within a child of the AuthenticationContextProvider',
		);
	return value;
};

export { useAuthenticationContext, AuthenticationContextProvider };
