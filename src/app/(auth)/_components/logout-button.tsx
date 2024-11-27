'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import type { LogoutButtonProps } from '@/lib/types/auth/auth.types';

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
