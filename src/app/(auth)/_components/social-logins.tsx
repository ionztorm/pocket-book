import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { LoginButtonSocial } from './login-button-social';

export function SocialLogins() {
	return (
		<div className='grid gap-4'>
			<LoginButtonSocial icon={FcGoogle} provider='google' />
			<LoginButtonSocial icon={AiFillGithub} provider='github' />
		</div>
	);
}
