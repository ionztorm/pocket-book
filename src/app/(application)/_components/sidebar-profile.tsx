import { headers } from 'next/headers';
import { SidebarFooter, SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';
import { auth } from '@/lib/auth';
import { UserMenu } from '@/components/user-menu';

export async function SidebarProfile() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return null;
	}

	return (
		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					<UserMenu />
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	);
}
