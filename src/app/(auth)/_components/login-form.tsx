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
import { Separator } from '@/components/ui/separator';
import type { LoginFormErrors } from '@/lib/types/auth/auth.types';
import type { Login } from '@/lib/types/validation.types';
import { LoginSchema } from '@/lib/validations/schema/auth.email.auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthenticationContext } from '../_context/auth-context';
import { AuthCard } from './auth-card';
import { OTPForm } from './otp-form';
import { SocialLogins } from './social-logins';

export function LoginForm() {
	const [errors, _setErrors] = useState<LoginFormErrors | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const { setEmail } = useAuthenticationContext();
	const form = useForm<Login>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
		},
	});

	const isPending = form.formState.isSubmitting;

	const onSubmit = async (values: Login) => {
		console.log(values);
		setEmail(values.email);
		// const data = await authClient.emailOtp.sendVerificationOtp(
		// 	{ email: values.email, type: 'sign-in' },
		// 	{
		// 		onSuccess: () => {
		// 			toast.success("We've sent you a one time password. Please check your emails.");
		// 			setEmail(values.email);
		// 			setIsOpen(true);
		// 		},
		// 		onError: (ctx) => {
		// 			toast.error(ctx.error.message);
		// 			return;
		// 		},
		// 	},
		// );
		// return data;
	};

	return (
		<AuthCard title='Welcome back!' description='Enter your details to continue...'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										disabled={form.formState.isSubmitting}
										placeholder='joe.bloggs@example.com'
										autoComplete='email'
										{...field}
									/>
								</FormControl>
								<FormMessage>{errors?.email ? errors.email : ''}</FormMessage>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										disabled={form.formState.isSubmitting}
										placeholder='*******'
										autoComplete='password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' className='w-full flex-1'>
						{isPending ? <Loading /> : 'Login'}
					</Button>
				</form>
			</Form>
			<OTPForm isOpen={isOpen} setIsOpen={setIsOpen} otpFormType='sign-in' />
			<Separator />
			<SocialLogins />
		</AuthCard>
	);
}
