import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Book } from 'lucide-react';
import Link from 'next/link';

export function SidebarLogo() {
	return (
		<SidebarMenuItem>
			<SidebarMenuButton size='lg' asChild>
				<Link href='/'>
					<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
						<Book className='size-4' />
					</div>
					<div className='leading-none'>
						<p className='font-semibold'>Pocket Book</p>
					</div>
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
}
