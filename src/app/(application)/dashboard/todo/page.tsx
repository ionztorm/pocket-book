import { AppPageSidebar } from '@/app/(application)/_components/app-page-sidebar';
import { DynamicSidebarMenu } from '@/app/(application)/_components/dynamic-sidebar-menu';
import { dynamicTodoMenuData, tempTodoMenuContent } from '@/lib/tempData';

export default function TodoPage() {
	/* TODO:
	 * fetch todo dynamic menu items from db
	 */
	return (
		<>
			<AppPageSidebar>
				<DynamicSidebarMenu menuData={dynamicTodoMenuData} menuItems={tempTodoMenuContent} />
			</AppPageSidebar>
			{/* main todo body content here*/}
		</>
	);
}
