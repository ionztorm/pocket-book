import { Button } from '@/components/ui/button';
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export type OTPFormProps = Readonly<{
	setHasCode: (hasCode: boolean) => void;
}>;

export function OTPNotice({ setHasCode }: OTPFormProps) {
	return (
		<>
			<DialogHeader>
				<DialogTitle>OTP Bro</DialogTitle>
				<DialogDescription asChild>
					<p>
						You should have received an email with a 6 digit code. Please enter it below. The is
						valid for 5 minutes.
					</p>
				</DialogDescription>
			</DialogHeader>
			<DialogFooter>
				<Button type='button' onClick={() => setHasCode(true)}>
					I&apos;ve got it, let me in!
				</Button>
			</DialogFooter>
		</>
	);
}
