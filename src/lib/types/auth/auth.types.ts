import type { Dispatch, SetStateAction } from 'react';
import type { IconType } from 'react-icons/lib';
import type { ChildrenProps } from '@/lib/types/global.types';

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
