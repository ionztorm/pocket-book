import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { OTPForm } from './otpform';

export function OtpCard() {
	return (
		<Card className='mx-auto grid w-full max-w-sm gap-2'>
			<CardHeader>
				<CardTitle className='text-2xl'>Email Verification</CardTitle>
				<CardDescription className='text-xs'>
					We've sent a verification code to your email address. Enter it below to verify your email
					address. The code is only valid for 5 minutes.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<OTPForm />
			</CardContent>
			<CardFooter className='text-xs'>Didn't receive your code? Get another one.</CardFooter>
		</Card>
	);
}
