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
import type { Signup } from '@/lib/types/validation.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Separator } from '@/components/ui/separator';
import { SignupSchema } from '@/lib/validations/schema/auth.email.auth.schema';
import { useAuthenticationContext } from '../_context/auth-context';
import { AuthCard } from './auth-card';
import { OTPForm } from './otp-form';
import { SocialLogins } from './social-logins';
export function RegisterForm() {
	const [_errors, _setErrors] = useState<SignupFormErrors | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const { setEmail } = useAuthenticationContext();
	const form = useForm<Signup>({
		resolver: zodResolver(SignupSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});
	const isPending = form.formState.isSubmitting;

	const onSubmit = async (values: Signup) => {
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
		<AuthCard title='Welcome aboard!' description='Enter your login details to get started...'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										disabled={isPending}
										autoComplete='name'
										placeholder='Joe Bloggs'
										type='text'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										disabled={isPending}
										autoComplete='email'
										placeholder='joe.bloggs@example.com'
										type='email'
										{...field}
									/>
								</FormControl>
								<FormMessage />
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
										disabled={isPending}
										autoComplete='password'
										placeholder='*******'
										type='password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<Input
										disabled={isPending}
										autoComplete='password'
										placeholder='*******'
										type='password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' disabled={isPending}>
						{isPending ? <Loading /> : 'Register'}
					</Button>
				</form>
			</Form>
			<OTPForm isOpen={isOpen} setIsOpen={setIsOpen} otpFormType='sign-in' />
			<Separator />
			<SocialLogins />
		</AuthCard>
	);
}
