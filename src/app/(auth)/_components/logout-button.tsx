'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { ChildrenProps } from '@/lib/types/global.types';

export type LogoutButtonProps = Readonly<{ className?: string }> & ChildrenProps;

export function LogoutButton({ children, className }: LogoutButtonProps) {
	const router = useRouter();
	const signOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push('/');
				},
			},
		});
	};

	return (
		<Button variant='ghost' onClick={signOut} className={className}>
			{children}
		</Button>
	);
}
