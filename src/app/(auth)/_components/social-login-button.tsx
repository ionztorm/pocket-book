import { IconType } from 'react-icons/lib';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { AuthLoginProviders } from '@/lib/types/auth/auth.types';
import { capitalise } from '@/lib/utils';

export type SocialLoginButtonProps = Readonly<{
	provider: AuthLoginProviders;
	icon: IconType;
	type: SocialLoginButtonActionTypes;
}>;

export type SocialLoginButtonActionTypes = 'Login' | 'Register';

export function SocialLoginButton({ provider, icon, type }: SocialLoginButtonProps) {
	const Icon = icon;
	const socialLogin = async (provider: AuthLoginProviders) => {
		await authClient.signIn.social(
			{ provider, callbackURL: '/dashboard/todo' },
			{
				onSuccess: () => {},
				onError: () => {},
			},
		);
	};

	return (
		<Button variant='outline' className='w-full' onClick={() => socialLogin(provider)}>
			<Icon />
			{type} with {capitalise(provider)}
		</Button>
	);
}
