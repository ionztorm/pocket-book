import type { ChildrenProps } from '@/lib/types/global.types';
import { AuthenticationContextProvider } from '../_context/auth-context';
import { Card } from '@/components/ui/card';

export default function AuthLayout({ children }: ChildrenProps) {
	return (
		<AuthenticationContextProvider>
			<div className='grid min-h-[100dvh] w-full place-items-center'>
				<Card className='mx-auto w-full max-w-sm'>{children}</Card>
			</div>
		</AuthenticationContextProvider>
	);
}
