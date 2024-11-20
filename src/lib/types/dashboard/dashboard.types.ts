import { ChildrenProps } from '@/lib/types/global.types';

export type DashboardLayoutProps = ChildrenProps;
export type AppPageSidebarProps = ChildrenProps;
export type DynamicMenuData = Readonly<{
	label: string;
	action: string;
	actionDescription: string;
}>;
export type DynamicSidebarMenuProps = Readonly<{
	menuData: DynamicMenuData;
	menuItems: DynamicMenuItems;
}>;
export type DynamicMenuItem = {
	id: number;
	label: string;
};
export type DynamicMenuItems = DynamicMenuItem[];
