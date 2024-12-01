import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { authClient } from '@/lib/auth-client';
import { AuthPageComponentProps } from '@/lib/types/auth/auth.types';
import type { Signup } from '@/lib/types/validation.types';
import { SignupSchema } from '@/lib/validations/schema/auth.email.signup.schema';
import { SocialLogins } from './social-logins';

export function RegisterForm({ onSelectAuthOption }: AuthPageComponentProps) {
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();
	const formRef = useRef<HTMLFormElement>(null);
	const form = useForm<Signup>({
		resolver: zodResolver(SignupSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (values: Signup) => {
		const signUpValues = { name: values.name, email: values.email, password: values.password };

		await authClient.signUp.email(
			{ ...signUpValues },
			{
				onRequest: () => setIsPending(true),
				onSuccess: () => {
					setIsPending(false);
					toast.success('Account created successfully');
					router.push('/dashboard/todo');
				},
				onError: (ctx) => {
					setIsPending(false);
					toast.error(ctx.error.message);
				},
			},
		);
	};

	return (
		<>
			<CardHeader>
				<CardTitle className='text-2xl'>Register</CardTitle>
				<CardDescription>Enter your email below to create an account</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className='grid gap-3'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder='Joe Bloggs' {...field} />
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
										<Input placeholder='e@mai.l' type='email' {...field} />
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
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input {...field} type='password' />
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
										<Input {...field} type='password' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' disabled={isPending}>
							{isPending ? <Loading /> : 'Submit'}
						</Button>
					</form>
				</Form>

				<SocialLogins type='Register' />
				<div className='mt-4 text-center text-sm'>
					Already have an account?{' '}
					<Button asChild variant='link' onClick={() => onSelectAuthOption('login')}>
						<Link href='#' className='underline'>
							Log in
						</Link>
					</Button>
				</div>
			</CardContent>
		</>
	);
}
