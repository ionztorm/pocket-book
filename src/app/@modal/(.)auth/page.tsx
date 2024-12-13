'use client';
import { AuthTabsDialog } from '@/app/(auth)/_components/auth-tabs-dialog';
import { VerificationSentDialog } from '@/app/(auth)/_components/verification-sent-dialog';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AuthIntersectionDialog() {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const router = useRouter();

	return (
		<Dialog defaultOpen onOpenChange={() => router.back()}>
			<DialogContent>
				{isSubmitted && <VerificationSentDialog />}
				{!isSubmitted && <AuthTabsDialog setIsSubmitted={setIsSubmitted} />}
			</DialogContent>
		</Dialog>
	);
}
