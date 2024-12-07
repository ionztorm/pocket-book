import { Button } from '@/components/ui/button';
import {
	DialogClose,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import type { OTP } from '@/lib/types/validation.types';
import { OTPSchema } from '@/lib/validations/schema/auth.email.login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAuthenticationContext } from '../_context/auth-context';

export function OTPForm() {
	const { dispatch: otpDispatch } = useAuthenticationContext();
	const form = useForm<OTP>({
		resolver: zodResolver(OTPSchema),
		defaultValues: {
			otp: '',
		},
	});

	const onSubmit = (values: OTP) => {
		console.log(values);
		otpDispatch({ type: 'otp', otp: values.otp });
	};
	return (
		<>
			<DialogHeader className='items-center'>
				<DialogTitle>Enter your One Time Password</DialogTitle>
				<DialogDescription asChild>
					<p>
						Enter the temporary 6 digit code we sent to your email address. It's only valid for 5
						minutes. You can copy and paste the code from the email if you like.
					</p>
				</DialogDescription>
			</DialogHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name='otp'
						render={({ field }) => (
							<FormItem className='flex flex-col items-center gap-2'>
								<FormLabel className='sr-only'>Enter your one time password</FormLabel>
								<FormControl>
									<InputOTP maxLength={6} {...field}>
										<InputOTPGroup>
											<InputOTPSlot index={0} />
											<InputOTPSlot index={1} />
											<InputOTPSlot index={2} />
										</InputOTPGroup>
										<InputOTPSeparator />
										<InputOTPGroup>
											<InputOTPSlot index={3} />
											<InputOTPSlot index={4} />
											<InputOTPSlot index={5} />
										</InputOTPGroup>
									</InputOTP>
								</FormControl>
							</FormItem>
						)}
					/>
					<DialogFooter>
						<DialogClose asChild>
							<Button type='submit'>Submit</Button>
						</DialogClose>
					</DialogFooter>
				</form>
			</Form>
		</>
	);
}
