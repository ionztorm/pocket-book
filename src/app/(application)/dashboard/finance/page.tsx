import { ApplicationsContent } from '@/app/(application)/_components/applications-content';
import { SidebarAppSubMenu } from '@/app/(application)/_components/sidebar-app-sub-menu';
import { SidebarWrapper } from '@/app/(application)/_components/sidebar-wrapper';
import { dynamicFinanceMenuData, tempFinanceMenuContent } from '@/lib/tempData';

export default function TodoPage() {
	/* TODO:
	 * fetch dynamic menu items from db
	 */
	return (
		<>
			<SidebarWrapper>
				<SidebarAppSubMenu menuData={dynamicFinanceMenuData} menuItems={tempFinanceMenuContent} />
			</SidebarWrapper>
			{/* main body content here*/}
			<ApplicationsContent title='Finance'>
				<p>No financial stuff yet</p>
			</ApplicationsContent>
		</>
	);
}
