import { ChildrenProps } from '@/lib/types/global.types';

// Layout
export type DashboardLayoutProps = ChildrenProps;

// Sidebar
export type SidebarWrapperProps = ChildrenProps;
export type SidebarAppSubMenuData = Readonly<{
	label: string;
	action: string;
	actionDescription: string;
}>;
export type SidebarAppSubMenuItem = {
	id: number;
	label: string;
};
export type SidebarAppSubMenuItems = SidebarAppSubMenuItem[];
export type SidebarAppSubMenuProps = Readonly<{
	menuData: SidebarAppSubMenuData;
	menuItems: SidebarAppSubMenuItems;
}>;

// Application main
export type ApplicationsContentProps = Readonly<{ title: string }> & ChildrenProps;
