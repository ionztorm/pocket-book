import type { Dispatch, SetStateAction } from 'react';

export type AuthLoginProviders = 'google' | 'github';
export type AuthOptions = 'register' | 'login' | 'passwordReset';
export type AuthPageComponentProps = Readonly<{
	setState: Dispatch<SetStateAction<AuthOptions>>;
}>;
