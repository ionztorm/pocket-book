import type { Dispatch, SetStateAction } from 'react';

export type AuthLoginProviders = 'google';
export type AuthOptions = 'register' | 'login' | 'passwordReset';
export type AuthPageComponentProps = Readonly<{
	setState: Dispatch<SetStateAction<AuthOptions>>;
}>;
