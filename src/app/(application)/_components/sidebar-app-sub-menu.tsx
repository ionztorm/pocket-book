import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { SidebarAppSubMenuProps } from '@/lib/types/dashboard/dashboard.types';
import { removeSpaces } from '@/lib/utils';
import { Plus } from 'lucide-react';

export function SidebarAppSubMenu({ menuData, menuItems }: SidebarAppSubMenuProps) {
	const { label, action, actionDescription } = menuData;
	const inputId = removeSpaces(action);
	return (
		<SidebarGroup>
			<SidebarGroupLabel>{label}</SidebarGroupLabel>
			<Dialog>
				<DialogTrigger asChild>
					<SidebarGroupAction title='Add todo category'>
						<Plus /> <span className='sr-only'>{action}</span>
					</SidebarGroupAction>
				</DialogTrigger>
				<DialogContent className='grid gap-4'>
					<DialogHeader>
						<DialogTitle>{action}</DialogTitle>
						<DialogDescription>{actionDescription}</DialogDescription>
					</DialogHeader>
					<form className='grid gap-4'>
						<Label htmlFor={inputId} className='sr-only'>
							{action}
						</Label>
						<Input id={inputId} placeholder={action} />
						<DialogFooter>
							<DialogClose asChild>
								<Button variant='destructive'>Close</Button>
							</DialogClose>
							<Button>Save</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
			<SidebarMenu>
				{menuItems.map((item) => (
					<SidebarMenuItem key={item.id}>
						<SidebarMenuButton>{item.label}</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
