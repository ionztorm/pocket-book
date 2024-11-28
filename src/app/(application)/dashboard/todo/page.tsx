import { ApplicationsContent } from '@/app/(application)/_components/applications-content';
import { SidebarAppSubMenu } from '@/app/(application)/_components/sidebar-app-sub-menu';
import { SidebarWrapper } from '@/app/(application)/_components/sidebar-wrapper';
import { dynamicTodoMenuData, tempTodoMenuContent } from '@/lib/tempData';

export default function TodoPage() {
	/* TODO:
	 * fetch dynamic menu items from db
	 */
	return (
		<>
			<SidebarWrapper>
				<SidebarAppSubMenu menuData={dynamicTodoMenuData} menuItems={tempTodoMenuContent} />
			</SidebarWrapper>
			{/* main body content here*/}
			<ApplicationsContent title='Todos'>
				<p>No todos yet</p>
			</ApplicationsContent>
		</>
	);
}
