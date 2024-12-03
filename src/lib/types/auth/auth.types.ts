import type { Dispatch, SetStateAction } from 'react';
import { Path } from 'react-hook-form';
import type { IconType } from 'react-icons/lib';
import type { ChildrenProps } from '@/lib/types/global.types';
import { Login, Signup } from '../validation.types';

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

// auth forms

export type SignupFields = Readonly<keyof Signup>;
export type LoginFields = Readonly<keyof Login>;

export type FormErrors<TFields extends string> = Readonly<{
	[K in TFields]?: ReadonlyArray<string>;
}> &
	Readonly<{
		saving?: ReadonlyArray<string>;
	}>;

export type FormField<T extends string> = Readonly<{
	name: Path<{ [key in T]: string }>;
	placeholder: string;
}>;

export type SignupFormErrors = Readonly<FormErrors<SignupFields>>;
export type LoginFormErrors = Readonly<FormErrors<LoginFields>>;
export type SignupFormFields = Readonly<FormField<SignupFields>>;
export type LoginFormFields = Readonly<FormField<LoginFields>>;
