'use client';
import { AuthTabsDialog } from '@/app/(auth)/_components/auth-tabs-dialog';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

export default function AuthIntersectionDialog() {
	const router = useRouter();

	return (
		<Dialog defaultOpen onOpenChange={() => router.back()}>
			<DialogContent>
				<AuthTabsDialog />
			</DialogContent>
		</Dialog>
	);
}
