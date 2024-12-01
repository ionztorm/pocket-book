import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { SocialLoginProps } from '@/lib/types/auth/auth.types';
import { LoginButtonSocial } from './login-button-social';

export function SocialLogins({ type }: SocialLoginProps) {
	return (
		<div className='grid gap-4'>
			<LoginButtonSocial icon={FcGoogle} provider='google' type={type} />
			<LoginButtonSocial icon={AiFillGithub} provider='github' type={type} />
		</div>
	);
}
