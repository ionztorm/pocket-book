'use client';
import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { SignupSchema } from '@/lib/validations/schema/auth.email.signup.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Separator } from '@/components/ui/separator';
import { sendOtpEmail } from '@/lib/utils/otpUtils';
import { toast } from 'sonner';
import { useAuthenticationContext } from '../_context/auth-context';
import { OTPForm } from './otp-form';
import { SocialLogins } from './social-logins';
export function RegisterForm() {
	const [errors, _setErrors] = useState<SignupFormErrors | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const { dispatch: registerDispatch } = useAuthenticationContext();
	const form = useForm<Signup>({
		resolver: zodResolver(SignupSchema),
		defaultValues: {
			name: '',
			email: '',
		},
	});
	const isPending = form.formState.isSubmitting;

	const onSubmit = async (values: Signup) => {
		// const data = await authClient.emailOtp.sendVerificationOtp({
		// 	email: values.email,
		// 	type: 'email-verification',
		// });
		const data = await sendOtpEmail(values.email, 'email-verification');
		console.log(data);
		// const data = await signInWithOtp(values.email, values.otp);
		console.log(values);
		registerDispatch({ type: 'name', name: values.name });
		registerDispatch({ type: 'email', email: values.email });
		toast.success("We've sent you a one time password. Please check your emails.");
		setIsOpen(true);
	};

	return (
		<>
			<CardHeader>
				<CardTitle className='text-2xl'>Register</CardTitle>
				<CardDescription>Enter your email below to create an account</CardDescription>
			</CardHeader>
			<CardContent className='grid gap-4'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-3'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='sr-only'>Name</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											autoComplete='name'
											placeholder='Joe Bloggs'
											{...field}
										/>
									</FormControl>
									<FormMessage>{errors?.name ? errors.name : ''}</FormMessage>
								</FormItem>
							)}
						/>
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
				<OTPForm type='email-verification' isOpen={isOpen} setIsOpen={setIsOpen} />
				<Separator />
				<SocialLogins />
				<Separator />
				<div className='mt-4 text-center text-sm'>
					Already have an account?{' '}
					<Button asChild variant='link'>
						<Link href='/auth/login' className='underline'>
							Log in
						</Link>
					</Button>
				</div>
			</CardContent>
		</>
	);
}
