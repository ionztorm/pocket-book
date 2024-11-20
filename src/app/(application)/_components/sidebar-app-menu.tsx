import Link from 'next/link';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

const menuItems = [
	{ id: 1, title: 'Todos', path: '#' },
	{ id: 2, title: 'Finance', path: '#' },
];

export function SidebarAppMenu() {
	const menuList = menuItems.map((item) => (
		<SidebarMenuItem key={item.id}>
			<SidebarMenuButton asChild>
				<Link href={item.path}>{item.title}</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	));
	return <SidebarMenu>{menuList}</SidebarMenu>;
}
