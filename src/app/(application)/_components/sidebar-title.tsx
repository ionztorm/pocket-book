import { Book } from 'lucide-react';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

export function SidebarTitle() {
	return (
		<SidebarMenuItem>
			<SidebarMenuButton size='lg' asChild>
				<a href='#'>
					<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
						<Book className='size-4' />
					</div>
					<div className='leading-none'>
						<p className='font-semibold'>Pocket Book</p>
					</div>
				</a>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
}
