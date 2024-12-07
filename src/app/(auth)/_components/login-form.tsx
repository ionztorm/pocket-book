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
import { Separator } from '@/components/ui/separator';
import type { LoginFormErrors } from '@/lib/types/auth/auth.types';
import type { Email } from '@/lib/types/validation.types';
import { EmailSchema } from '@/lib/validations/schema/auth.email.login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useAuthenticationContext } from '../_context/auth-context';
import { OTPDialog } from './otp-dialog';
import { SocialLogins } from './social-logins';

export function LoginForm() {
	const [errors, _setErrors] = useState<LoginFormErrors | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const { dispatch: loginDispatch } = useAuthenticationContext();

	const form = useForm<Email>({
		resolver: zodResolver(EmailSchema),
		defaultValues: {
			email: '',
		},
	});

	const onSubmit = (values: Email) => {
		loginDispatch({ type: 'email', email: values.email });
		setIsOpen(true);
		toast.success("We've sent you a one time password. Please check your emails.");
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
									<FormLabel className='sr-only'>Email</FormLabel>
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
						<Button type='submit' className='w-full flex-1'>
							Send a code
						</Button>
					</form>
				</Form>
				<OTPDialog isOpen={isOpen} setIsOpen={setIsOpen} />
				<Separator />
				<SocialLogins />

				<Separator />
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
