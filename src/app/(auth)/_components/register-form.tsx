import { type FormErrors, registerUserAction } from '@/actions/auth.actions';
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
import type { AuthPageComponentProps } from '@/lib/types/auth/auth.types';
import type { Signup } from '@/lib/types/validation.types';
import { SignupSchema } from '@/lib/validations/schema/auth.email.signup.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { SocialLogins } from './social-logins';

export function RegisterForm({ onSelectAuthOption }: AuthPageComponentProps) {
	const [errors, setErrors] = useState<FormErrors | null>(null);
	const router = useRouter();
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
		const result = await registerUserAction(values);

		if (result.errors) {
			toast.error(result.errors.signup?.[0] || 'An error occurred');
			setErrors(result.errors);
			return;
		}

		toast.success(`Welcome ${result.name}`);
		router.push('/dashboard/todo');
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
										<Input disabled={isPending} placeholder='Joe Bloggs' {...field} />
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
										<Input disabled={isPending} placeholder='e@mai.l' type='email' {...field} />
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
										<Input disabled={isPending} {...field} type='password' />
									</FormControl>
									<FormMessage>{errors?.password ? errors.password : ''}</FormMessage>
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
										<Input disabled={isPending} {...field} type='password' />
									</FormControl>
									<FormMessage>{errors?.confirmPassword ? errors.confirmPassword : ''}</FormMessage>
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
