import type { ChildrenProps } from '@/lib/types/global.types';
import type { Dispatch, SetStateAction } from 'react';
import type { IconType } from 'react-icons/lib';
import type { Email, Login, OTP, Signup } from '../validation.types';

export type AuthLoginProviders = Readonly<'google' | 'github'>;
export type AuthPageComponentProps = Readonly<{
	onChangeAuthState: Dispatch<SetStateAction<AuthFormStates | null>>;
}>;
export type SocialLoginButtonActionTypes = Readonly<'Login' | 'Register'>;
export type SocialLoginButtonProps = Readonly<{
	provider: AuthLoginProviders;
	icon: IconType;
}>;

export type OtpEmailTypes = 'sign-in' | 'email-verification';

export type OTPFormProps = Readonly<{
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}>;

export type TAuthenticationContext = {
	email: Email['email'] | null;
	setEmail: Dispatch<SetStateAction<Email['email'] | null>>;
};

export type TAuthenticationContextProviderProps = {
	children: React.ReactNode;
};

export type AuthContextReducerState = {
	name: string | null;
	email: Email['email'] | null;
	otp: OTP['otp'] | null;
};

export type AuthContextReducerAction =
	| { type: 'email'; email: string }
	| { type: 'name'; name: string }
	| { type: 'otp'; otp: string };

export type AuthFormStates = 'register' | 'login' | 'otp';

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
