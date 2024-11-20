import { SidebarTrigger } from '@/components/ui/sidebar';
import type { AppPageContentProps } from '@/lib/types/dashboard/dashboard.types';

export function AppPageContent({ title, children }: AppPageContentProps) {
	return (
		<div className='grid w-full grid-rows-[auto_1fr_auto] p-5'>
			<header className='flex items-center gap-3'>
				<SidebarTrigger />
				<h1 className='font-extrabold'>{title}</h1>
			</header>
			<main className='w-full py-10'>{children}</main>
			<footer>Footer</footer>
		</div>
	);
}
