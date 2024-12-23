import { SidebarProvider } from '@/components/ui/sidebar';
import type { DashboardLayoutProps } from '@/lib/types/dashboard/dashboard.types';

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	return <SidebarProvider>{children}</SidebarProvider>;
}
