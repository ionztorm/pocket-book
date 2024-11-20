import { SidebarAppMenu } from '@/app/(application)/_components/sidebar-app-menu';
import { SidebarTitle } from '@/app/(application)/_components/sidebar-title';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu } from '@/components/ui/sidebar';
import type { AppPageSidebarProps } from '@/lib/types/dashboard/dashboard.types';

export function AppPageSidebar({ children }: AppPageSidebarProps) {
	return (
		<Sidebar variant='sidebar' collapsible='offcanvas'>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarTitle />
				</SidebarMenu>
				<SidebarAppMenu />
			</SidebarHeader>
			<SidebarContent>{children}</SidebarContent>
		</Sidebar>
	);
}
