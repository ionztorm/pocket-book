import type {
	SidebarAppSubMenuData,
	SidebarAppSubMenuItems,
} from '@/lib/types/dashboard/dashboard.types';

export const dynamicTodoMenuData: SidebarAppSubMenuData = {
	label: 'Projects',
	action: 'Add a project',
	actionDescription:
		'Projects allow you to group your todos by theme, making them simpler to manage and understand',
};

export const dynamicFinanceMenuData: SidebarAppSubMenuData = {
	label: 'Accounts',
	action: 'Add an account',
	actionDescription: 'Add your accounts and cards and start tracking your debts and expenses',
};
export const tempTodoMenuContent: SidebarAppSubMenuItems = [
	{ id: 1, label: 'Holiday' },
	{ id: 2, label: 'Shopping' },
	{ id: 3, label: 'Work' },
];

export const tempFinanceMenuContent: SidebarAppSubMenuItems = [
	{ id: 1, label: 'Barclays' },
	{ id: 2, label: 'Lloyds' },
	{ id: 3, label: 'Very Store Account' },
];
