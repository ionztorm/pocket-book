import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
	CreditCard,
	LogOutIcon,
	User,
} from 'lucide-react';
import { headers } from 'next/headers';
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { LogoutButton } from '@/app/(auth)/_components/logout-button';
import { Button } from '@/components/ui/button';
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { SidebarMenuSubButton } from '@/components/ui/sidebar';
import { UserAvatar } from '@/components/user-avatar';
import { auth } from '@/lib/auth';

export type UserMenuProps = Readonly<{
	side?: 'left' | 'right' | 'top' | 'bottom';
	align?: 'start' | 'center' | 'end';
	type?: 'sidebar' | 'landing';
}>;

export async function UserMenu({
	side = 'bottom',
	align = 'center',
	type = 'sidebar',
}: UserMenuProps) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return null;
	}

	const ChevronIcon = {
		bottom: ChevronUp,
		right: ChevronRight,
		left: ChevronLeft,
		top: ChevronDown,
	}[side];

	if (type === 'landing')
		return (
			<DropdownMenu>
				<DropdownMenuTrigger className='h-10 w-full'>
					<Button variant='ghost' className='flex w-full items-center'>
						<UserAvatar name={session?.user.name} image={session?.user.image} size='lg' />
						{session?.user.name}
						{ChevronIcon && <ChevronIcon className='ml-auto' />}
					</Button>
				</DropdownMenuTrigger>
				<UserMenuContent side={side} align={align} />
			</DropdownMenu>
		);

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild className='h-10 w-full cursor-pointer'>
				<SidebarMenuSubButton>
					<UserAvatar name={session?.user.name} image={session?.user.image} size='md' />
					{session?.user.name}
					{ChevronIcon && <ChevronIcon className='ml-auto' />}
				</SidebarMenuSubButton>
			</DropdownMenuTrigger>
			<UserMenuContent side={side} align={align} />
		</DropdownMenu>
	);
}

export type UserMenuContentProps = Readonly<{
	side?: 'left' | 'right' | 'top' | 'bottom';
	align?: 'start' | 'center' | 'end';
}>;

function UserMenuContent({ side, align }: UserMenuContentProps) {
	return (
		<DropdownMenuContent side={side} align={align} className='w-56'>
			<DropdownMenuLabel>Account</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuItem>
				<CreditCard className='mr-2 size-4' /> Manage Subscription
			</DropdownMenuItem>
			<DropdownMenuItem>
				<User className='mr-2 size-4' /> Manage Account
			</DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuItem>
				<LogoutButton className='m-0 max-h-max p-0'>
					<LogOutIcon className='mr-2 size-4' /> Log out
				</LogoutButton>
			</DropdownMenuItem>
		</DropdownMenuContent>
	);
}
