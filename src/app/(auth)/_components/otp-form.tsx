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
import { authClient } from '@/lib/auth-client';
import type { OTPFormProps } from '@/lib/types/auth/auth.types';
import type { OTP } from '@/lib/types/validation.types';
import { OTPSchema } from '@/lib/validations/schema/auth.email.login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useAuthenticationContext } from '../_context/auth-context';

export function OTPForm({ isOpen, setIsOpen }: OTPFormProps) {
	const { email, setEmail } = useAuthenticationContext();
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
		if (!email) {
			toast.error("It looks as though we don't have your email address");
			router.push('/auth/register');
			return null;
		}
		const data = await authClient.signIn.emailOtp(
			{ email, otp: values.otp },
			{
				onSuccess: () => {
					toast.success('You have successfully logged in');
					setEmail(null);
					return router.push('/dashboard/todo');
				},
				onError: (ctx) => {
					toast.error(ctx.error.message);
					return;
				},
			},
		);
		return data;
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className='grid gap-4'>
				<DialogHeader className='items-center gap-2'>
					<DialogTitle>Enter your One Time Password</DialogTitle>
					<DialogDescription asChild>
						<p>
							We've sent a temporary code to {email}. It's only valid for 5 minutes. Go get it and
							paste it here.
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
