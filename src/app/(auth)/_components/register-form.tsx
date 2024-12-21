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
import type { Signup } from '@/lib/types/validation.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { OTPForm } from '@/app/(auth)/_components/otp-form';
import { SocialLogins } from '@/app/(auth)/_components/social-logins';
import { useAuthenticationContext } from '@/app/(auth)/_context/auth-context';
import { Separator } from '@/components/ui/separator';
import { authClient } from '@/lib/auth-client';
import { SignupSchema } from '@/lib/validations/schema/auth.email.auth.schema';
import { toast } from 'sonner';

export function RegisterForm() {
	const [isOpen, setIsOpen] = useState(false);
	const { setEmail } = useAuthenticationContext();

	const form = useForm<Signup>({
		resolver: zodResolver(SignupSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});
	const isPending = form.formState.isSubmitting;

	const onSubmit = async (values: Signup) => {
		try {
			await authClient.signUp.email(
				{
					...values,
				},
				{
					onSuccess: () => {
						toast.success('Welcome! Please check your emails and verify your email address.');
						setEmail(values.email);
						setIsOpen(true);
					},
					onError: (ctx) => {
						toast.error(ctx.error.message);
					},
				},
			);
		} catch (err) {
			console.log(err);
		}
	};

	const emailValue = form.watch('email');

	useEffect(() => {
		form.setValue('name', emailValue, { shouldValidate: true });
	}, [form.setValue, emailValue]);

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem className='hidden'>
								<FormControl>
									<Input type='hidden' {...field} />
								</FormControl>
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
										autoComplete='new-password'
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
					<Separator />
					<SocialLogins />
				</form>
			</Form>
			<OTPForm isOpen={isOpen} setIsOpen={setIsOpen} />
		</>
	);
}
