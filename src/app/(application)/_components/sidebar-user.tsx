'use client';
import { SidebarFooter, SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';
import { UserMenu } from '@/components/user-menu/user-menu';
import { authClient } from '@/lib/auth-client';

export function SidebarUser() {
	const { data } = authClient.useSession();
	if (!data) return null;

	return (
		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					<UserMenu side='top' session={data} />
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	);
}
