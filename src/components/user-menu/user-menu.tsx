import { Button } from '@/components/ui/button';
import { SidebarMenuSubButton } from '@/components/ui/sidebar';
import type { UserMenuProps } from '@/lib/types/global.types';
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import { UserAvatar } from './user-avatar';
import { UserMenuContent } from './user-menu-content';

export function UserMenu({
	side = 'bottom',
	align = 'center',
	type = 'sidebar',
	session,
}: UserMenuProps) {
	if (!session) {
		return null;
	}

	const ChevronIcon = {
		top: ChevronUp,
		right: ChevronRight,
		left: ChevronLeft,
		bottom: ChevronDown,
	}[side];

	if (type === 'landing')
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild className='h-10 w-full cursor-pointer'>
					<Button variant='ghost' className='flex w-full items-center'>
						<UserAvatar
							name={session?.user.name}
							image={session?.user.image}
							size='md'
							className='rounded-full'
						/>
						{session?.user.name}
						{ChevronIcon && <ChevronIcon className='ml-auto' />}
					</Button>
				</DropdownMenuTrigger>
				<UserMenuContent side={side} align={align} type='landing' />
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
