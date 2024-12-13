import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function VerificationSentDialog() {
	return (
		<>
			<DialogHeader>
				<DialogTitle>Verify your account</DialogTitle>
				<DialogDescription>
					We&apos;ve sent you a verification email containing a link you&apos;ll need to click
					before you can continue. If you've already verified, you can hit login above or, if you
					verified using this browser, you can refresh the page and access your dashboard from your
					user menu at the top-right of the screen.
				</DialogDescription>
			</DialogHeader>
		</>
	);
}
