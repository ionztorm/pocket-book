import { Dialog, DialogContent } from '@/components/ui/dialog';
import type { OTPFormProps } from '@/lib/types/auth/auth.types';
import { OTPForm } from './otp-form';

export function OTPDialog({ isOpen, setIsOpen }: OTPFormProps) {
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent>
				<OTPForm />
			</DialogContent>
		</Dialog>
	);
}
