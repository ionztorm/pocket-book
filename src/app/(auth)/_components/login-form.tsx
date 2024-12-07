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
import {} from '@/components/ui/input-otp';
import type { LoginFormErrors } from '@/lib/types/auth/auth.types';
import type { Email } from '@/lib/types/validation.types';
import { EmailSchema } from '@/lib/validations/schema/auth.email.login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useAuthenticationContext } from '../_context/auth-context';
import { OTPForm } from './otp-form';
import { SocialLogins } from './social-logins';

export function LoginForm() {
	const [errors, _setErrors] = useState<LoginFormErrors | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const { dispatch: loginDispatch } = useAuthenticationContext();
	const _router = useRouter();

	const form = useForm<Email>({
		resolver: zodResolver(EmailSchema),
		defaultValues: {
			email: '',
		},
	});

	const onSubmit = (values: Email) => {
		// 	console.log(values);
		// 	const result = await loginUserAction(values);

		// 	if (result?.errors) {
		// 		toast.error(result.errors.saving?.[0] || 'An error occurred');
		// 		setErrors(result.errors);
		// 		return;
		// 	}

		// 	toast.success('Welcome back');
		// 	router.push('/dashboard/todo');
		// };
		loginDispatch({ type: 'email', email: values.email });
		setIsOpen(true);
		toast.success("We've sent you a one time password. Please check your emails.");
		console.log(values);
	};

	return (
		<>
			<CardHeader>
				<CardTitle className='text-2xl'>Login</CardTitle>
				<CardDescription>Enter your email below to login to your account</CardDescription>
			</CardHeader>
			<CardContent className='grid gap-4'>
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
											placeholder='m@il.com'
											autoComplete='email'
											{...field}
										/>
									</FormControl>
									<FormMessage>{errors?.email ? errors.email : ''}</FormMessage>
								</FormItem>
							)}
						/>

						<Button type='submit' className='w-full'>
							Send me my code
						</Button>
					</form>
				</Form>
				<OTPForm isOpen={isOpen} setIsOpen={setIsOpen} />
				<SocialLogins type='Login' />
				<div className='mt-4 text-center text-sm'>
					Don&apos;t have an account?{' '}
					<Button asChild variant='link'>
						<Link href='/auth/register' className='underline'>
							Sign up
						</Link>
					</Button>
				</div>
			</CardContent>
		</>
	);
}
