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
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from 'sonner';
import { useAuthenticationContext } from '../_context/auth-context';
import { OTPDialog } from './otp-dialog';
import { SocialLogins } from './social-logins';
export function RegisterForm() {
	const [errors, _setErrors] = useState<SignupFormErrors | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const { dispatch: registerDispatch } = useAuthenticationContext();
	const _router = useRouter();
	const form = useForm<Signup>({
		resolver: zodResolver(SignupSchema),
		defaultValues: {
			name: '',
			email: '',
		},
	});
	const isPending = form.formState.isSubmitting;

	const onSubmit = async (values: Signup) => {
		// const result = await registerUserAction(values);
		//
		// if (result.errors) {
		// 	toast.error(result.errors.saving?.[0] ?? 'An error occurred');
		// 	setErrors(result.errors);
		// 	return;
		// }
		//
		// toast.success(`Welcome ${values.name}`);
		// router.push('/dashboard/todo');
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
									<FormLabel>Name</FormLabel>
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
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											autoComplete='email'
											placeholder='e@mai.l'
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
				<OTPDialog isOpen={isOpen} setIsOpen={setIsOpen} />
				<SocialLogins type='Register' />

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
