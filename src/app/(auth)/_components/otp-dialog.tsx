import { Dialog, DialogContent } from '@/components/ui/dialog';
import { OTPForm } from './otp-form';

export type OTPFormProps = Readonly<{
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}>;

export function OTPDialog({ isOpen, setIsOpen }: OTPFormProps) {
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent>
				<OTPForm />
			</DialogContent>
		</Dialog>
	);
}
