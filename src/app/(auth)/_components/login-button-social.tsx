import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import type { AuthLoginProviders, SocialLoginButtonProps } from '@/lib/types/auth/auth.types';
import { capitalise } from '@/lib/utils';

export function LoginButtonSocial({ provider, icon, type }: SocialLoginButtonProps) {
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
