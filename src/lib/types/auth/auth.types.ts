import type { ChildrenProps } from '@/lib/types/global.types';
import type { Dispatch, SetStateAction } from 'react';
import type { IconType } from 'react-icons/lib';
import type { Login, Signup } from '../validation.types';

export type AuthLoginProviders = Readonly<'google' | 'github'>;
export type AuthOptions = Readonly<'register' | 'login' | 'passwordReset'>;
export type AuthPageComponentProps = Readonly<{
	onSelectAuthOption: Dispatch<SetStateAction<AuthOptions>>;
}>;
export type SocialLoginButtonActionTypes = Readonly<'Login' | 'Register'>;
export type SocialLoginButtonProps = Readonly<{
	provider: AuthLoginProviders;
	icon: IconType;
	type: SocialLoginButtonActionTypes;
}>;
export type LogoutButtonProps = Readonly<{ className?: string }> & ChildrenProps;
export type SocialLoginProps = Readonly<{ type: SocialLoginButtonActionTypes }>;

export type SignupFields = Readonly<keyof Signup>;
export type LoginFields = Readonly<keyof Login>;

export type FormErrors<T extends string> = Readonly<{
	[K in T]?: ReadonlyArray<string>;
}> &
	Readonly<{ saving?: ReadonlyArray<string> }>;

export type SignupFormErrors = Readonly<FormErrors<SignupFields>>;
export type LoginFormErrors = Readonly<FormErrors<LoginFields>>;
