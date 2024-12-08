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
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import { Loading } from '@/components/ui/loading';
import type { OTPFormProps } from '@/lib/types/auth/auth.types';
import type { OTP } from '@/lib/types/validation.types';
import { signInWithOtp } from '@/lib/utils/otpUtils';
import { OTPSchema } from '@/lib/validations/schema/auth.email.login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useAuthenticationContext } from '../_context/auth-context';

export function OTPForm({ isOpen, setIsOpen }: OTPFormProps) {
	const { dispatch: otpDispatch, state } = useAuthenticationContext();
	const router = useRouter();
	const form = useForm<OTP>({
		resolver: zodResolver(OTPSchema),
		defaultValues: {
			otp: '',
		},
	});

	const isPending = form.formState.isSubmitting;

	const onSubmit = async (values: OTP) => {
		console.log(values);
		// check if email exists
		if (!state.email) {
			toast.error("It looks as though we don't have your email address");
			router.push('/auth/register');
			return null;
		}

		// attempt to sign in with OTP
		const data = await signInWithOtp(state.email, values.otp);
		console.log(data);
		if (data.error) return toast.error(data.error.message);
		// reset state and redirect
		otpDispatch({ type: 'otp', otp: '' });
		otpDispatch({ type: 'email', email: '' });
		otpDispatch({ type: 'name', name: '' });
		toast.success('You have successfully logged in');
		return router.push('/dashboard/todo');
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className='grid gap-4'>
				<DialogHeader className='items-center gap-2'>
					<DialogTitle>Enter your One Time Password</DialogTitle>
					<DialogDescription asChild>
						<p>
							We've sent a temporary code to {state.email}. It's only valid for 5 minutes. Go get it
							and paste it here.
						</p>
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
						<FormField
							control={form.control}
							name='otp'
							render={({ field }) => (
								<FormItem className='flex flex-col items-center gap-2'>
									<FormLabel className='sr-only'>Enter your one time password</FormLabel>
									<FormControl>
										<InputOTP maxLength={6} {...field} disabled={isPending}>
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
								<Button type='submit' disabled={isPending}>
									{isPending ? <Loading /> : 'Submit'}
								</Button>
							</DialogClose>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
