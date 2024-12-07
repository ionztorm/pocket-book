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

export function OTPForm() {
	const form = useForm<OTP>({
		resolver: zodResolver(OTPSchema),
		defaultValues: {
			otp: '',
		},
	});
	return (
		<>
			<DialogHeader className='items-center'>
				<DialogTitle>OTP Bro</DialogTitle>
				<DialogDescription asChild>
					<p>Please enter your code. The code is valid for 5 minutes.</p>
				</DialogDescription>
			</DialogHeader>
			<Form {...form}>
				<form>
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
				</form>
			</Form>
			<DialogFooter>
				<DialogClose asChild>
					<Button type='submit'>Submit</Button>
				</DialogClose>
			</DialogFooter>
		</>
	);
}
