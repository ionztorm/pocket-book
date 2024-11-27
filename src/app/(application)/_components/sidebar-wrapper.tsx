import { SidebarAppList } from '@/app/(application)/_components/sidebar-app-list';
import { SidebarLogo } from '@/app/(application)/_components/sidebar-logo';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu } from '@/components/ui/sidebar';
import type { SidebarWrapperProps } from '@/lib/types/dashboard/dashboard.types';
import { SidebarUser } from './sidebar-user';

export function SidebarWrapper({ children }: SidebarWrapperProps) {
	return (
		<Sidebar variant='sidebar' collapsible='offcanvas'>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarLogo />
				</SidebarMenu>
				<SidebarAppList />
			</SidebarHeader>
			<SidebarContent>{children}</SidebarContent>
			<SidebarUser />
		</Sidebar>
	);
}
