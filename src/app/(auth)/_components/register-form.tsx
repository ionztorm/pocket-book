'use client';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loading } from '@/components/ui/loading';
import type { SignupFormErrors } from '@/lib/types/auth/auth.types';
import type { Email } from '@/lib/types/validation.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Separator } from '@/components/ui/separator';
import { authClient } from '@/lib/auth-client';
import { EmailSchema } from '@/lib/validations/schema/auth.email.login.schema';
import { toast } from 'sonner';
import { useAuthenticationContext } from '../_context/auth-context';
import { AuthCard } from './auth-card';
import { OTPForm } from './otp-form';
import { SocialLogins } from './social-logins';
export function RegisterForm() {
	const [errors, _setErrors] = useState<SignupFormErrors | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const { setEmail } = useAuthenticationContext();
	const form = useForm<Email>({
		resolver: zodResolver(EmailSchema),
		defaultValues: {
			email: '',
		},
	});
	const isPending = form.formState.isSubmitting;

	const onSubmit = async (values: Email) => {
		const data = await authClient.emailOtp.sendVerificationOtp(
			{ email: values.email, type: 'sign-in' },
			{
				onSuccess: () => {
					toast.success("We've sent you a one time password. Please check your emails.");
					setEmail(values.email);
					setIsOpen(true);
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
		<AuthCard title='Welcome aboard!' description='Enter your login details to get started...'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='sr-only'>Email</FormLabel>
								<FormControl>
									<Input
										disabled={isPending}
										autoComplete='email'
										placeholder='joe.bloggs@example.com'
										type='email'
										{...field}
									/>
								</FormControl>
								<FormMessage>{errors?.email ? errors.email : ''}</FormMessage>
							</FormItem>
						)}
					/>
					<Button type='submit' disabled={isPending}>
						{isPending ? <Loading /> : 'Submit'}
					</Button>
				</form>
			</Form>
			<OTPForm isOpen={isOpen} setIsOpen={setIsOpen} otpFormType='sign-in' />
			<Separator />
			<SocialLogins />
		</AuthCard>
	);
}
