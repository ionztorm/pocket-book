'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { authClient } from '@/lib/auth-client';
import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function UserMenuLogout() {
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
		<DropdownMenuItem onSelect={signOut}>
			<LogOutIcon className='mr-2 size-4' /> Log out
		</DropdownMenuItem>
	);
}
