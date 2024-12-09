import type { UserMenuContentProps } from '@/lib/types/global.types';
import { CreditCard, LayoutDashboard, User } from 'lucide-react';
import Link from 'next/link';
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { UserMenuLogout } from './user-menu-logout';

export function UserMenuContent({ side, align, type }: UserMenuContentProps) {
	return (
		<DropdownMenuContent side={side} align={align} className='w-56'>
			<DropdownMenuLabel>Account</DropdownMenuLabel>
			<DropdownMenuSeparator />
			{type === 'landing' && (
				<DropdownMenuItem asChild>
					<Link href='/dashboard/todo'>
						<LayoutDashboard className='mr-2 size-4' /> Dashboard
					</Link>
				</DropdownMenuItem>
			)}
			<DropdownMenuItem>
				<CreditCard className='mr-2 size-4' /> Manage Subscription
			</DropdownMenuItem>
			<DropdownMenuItem>
				<User className='mr-2 size-4' /> Manage Account
			</DropdownMenuItem>
			<DropdownMenuSeparator />
			<UserMenuLogout />
		</DropdownMenuContent>
	);
}
