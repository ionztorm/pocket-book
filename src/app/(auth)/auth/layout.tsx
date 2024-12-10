import type { ChildrenProps } from '@/lib/types/global.types';
import { AuthenticationContextProvider } from '../_context/auth-context';

export default function AuthLayout({ children }: ChildrenProps) {
	return (
		<AuthenticationContextProvider>
			<div className='grid min-h-[100dvh] w-full place-items-center'>{children}</div>
		</AuthenticationContextProvider>
	);
}
