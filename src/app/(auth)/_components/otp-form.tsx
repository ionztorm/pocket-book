import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

export type OTPFormProps = Readonly<{
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}>;

export function OTPForm({ isOpen, setIsOpen }: OTPFormProps) {
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>OTP Bro</DialogTitle>
					<DialogDescription>
						You should have received an email with a 6 digit code. Please enter it below. The is
						valid for 5 minutes.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button type='submit'>I&apos;ve got it, let me in!</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
