import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import type { AuthLoginProviders, SocialLoginButtonProps } from '@/lib/types/auth/auth.types';
import { capitalise } from '@/lib/utils';

export function LoginButtonSocial({ provider, icon }: SocialLoginButtonProps) {
	const Icon = icon;
	const socialLogin = async (provider: AuthLoginProviders) => {
		await authClient.signIn.social({
			provider,
			callbackURL: '/dashboard/todo',
		});
	};

	return (
		<Button
			type='button'
			variant='outline'
			className='w-full rounded-lg shadow-sm'
			onClick={() => socialLogin(provider)}
		>
			<Icon />
			{capitalise(provider)}
		</Button>
	);
}
