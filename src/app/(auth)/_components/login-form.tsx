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
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import type { AuthPageComponentProps, LoginFormErrors } from '@/lib/types/auth/auth.types';
import type { Login } from '@/lib/types/validation.types';
import { LoginSchema } from '@/lib/validations/schema/auth.email.login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SocialLogins } from './social-logins';

export function LoginForm({ onSelectAuthOption }: AuthPageComponentProps) {
	const [errors, _setErrors] = useState<LoginFormErrors | null>(null);
	const _router = useRouter();

	const form = useForm<Login>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			otp: '',
		},
	});

	const onSubmit = async (values: Login) => {
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
											{...field}
										/>
									</FormControl>
									<FormMessage>{errors?.email ? errors.email : ''}</FormMessage>
								</FormItem>
							)}
						/>

						{/*
            TODO: put inside dialog
            */}
						<FormField
							control={form.control}
							name='otp'
							render={({ field }) => (
								<FormItem>
									<FormLabel>OTP</FormLabel>
									<FormControl>
										<InputOTP
											maxLength={6}
											pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
											value={field.value}
											onChange={field.onChange}
											onBlur={field.onBlur}
											className='justify-center'
										>
											<InputOTPGroup>
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
											</InputOTPGroup>
											<InputOTPSeparator />
											<InputOTPGroup>
												<InputOTPSlot index={2} />
												<InputOTPSlot index={3} />
											</InputOTPGroup>
											<InputOTPSeparator />
											<InputOTPGroup>
												<InputOTPSlot index={4} />
												<InputOTPSlot index={5} />
											</InputOTPGroup>
										</InputOTP>
									</FormControl>
									<FormMessage>{errors?.otp ? errors.otp : ''}</FormMessage>
								</FormItem>
							)}
						/>

						<Button type='submit' className='w-full'>
							Login
						</Button>
					</form>
				</Form>

				<SocialLogins type='Login' />
				<div className='mt-4 text-center text-sm'>
					Don&apos;t have an account?{' '}
					<Button asChild variant='link' onClick={() => onSelectAuthOption('register')}>
						<Link href='#' className='underline'>
							Sign up
						</Link>
					</Button>
				</div>
			</CardContent>
		</>
	);
}
