'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import { authClient } from '@/lib/auth-client';
import type { OTP } from '@/lib/types/validation.types';
import { OTPSchema } from '@/lib/validations/schema/auth.email.auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useAuthenticationContext } from '../_context/auth-context';

export function OTPForm() {
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
		if (!email) {
			toast.error("It looks as though we don't have your email address");
			router.push('/auth');
			return;
		}

		await authClient.emailOtp.verifyEmail(
			{ email, otp: values.otp },
			{
				onSuccess: () => {
					toast.success(
						"You have successfully verified your email address and we've logged you in.",
					);
					setEmail(null);
					// TODO: find a better way to do this.
					router.push('/dashboard/todo');
				},
				onError: (ctx) => {
					toast.error(ctx.error.message);
				},
			},
		);

		return;
	};

	return (
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
				<Button type='submit'>Submit</Button>
			</form>
		</Form>
	);
}
