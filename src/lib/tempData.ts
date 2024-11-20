import type { DynamicMenuData, DynamicMenuItems } from '@/lib/types/dashboard/dashboard.types';

export const dynamicTodoMenuData: DynamicMenuData = {
	label: 'Projects',
	action: 'Add a project',
	actionDescription:
		'Projects allow you to group your todos by theme, making them simpler to manage and understand',
};

export const tempTodoMenuContent: DynamicMenuItems = [
	{ id: 1, label: 'Holiday' },
	{ id: 2, label: 'Shopping' },
	{ id: 3, label: 'Work' },
];
