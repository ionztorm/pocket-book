import { IconType } from 'react-icons/lib';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { AuthLoginProviders } from '@/lib/types/auth/auth.types';
import { capitalise } from '@/lib/utils';

export type SocialLoginButtonProps = Readonly<{
	provider: AuthLoginProviders;
	icon: IconType;
}>;

export function SocialLoginButton({ provider, icon }: SocialLoginButtonProps) {
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
			Login with {capitalise(provider)}
		</Button>
	);
}
