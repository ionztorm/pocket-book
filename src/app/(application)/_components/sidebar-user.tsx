import { SidebarFooter, SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';
import { UserMenu } from '@/components/user-menu/user-menu';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function SidebarUser() {
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
					<UserMenu side='top' session={session} />
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	);
}
