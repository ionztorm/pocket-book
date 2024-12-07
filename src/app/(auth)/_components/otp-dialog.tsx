import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useState } from 'react';
import { OTPForm } from './otp-form';
import { OTPNotice } from './otp-notice';

export type OTPFormProps = Readonly<{
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}>;

export function OTPDialog({ isOpen, setIsOpen }: OTPFormProps) {
	const [hasCode, setHasCode] = useState(false);
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent>
				{!hasCode && <OTPNotice setHasCode={setHasCode} />}
				{hasCode && <OTPForm />}
			</DialogContent>
		</Dialog>
	);
}
