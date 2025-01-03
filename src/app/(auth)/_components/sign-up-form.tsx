'use client';
import { useAuthenticationContext } from '@/app/(auth)/_context/auth-context';
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
import { authClient } from '@/lib/auth-client';
import type { Signup } from '@/lib/types/validation.types';
import { SignupSchema } from '@/lib/validations/schema/auth.email.auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function SignUpForm() {
	const { setEmail } = useAuthenticationContext();
	const router = useRouter();

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
		await authClient.signUp.email(
			{
				...values,
			},
			{
				onSuccess: () => {
					toast.success('Welcome! Please check your emails and verify your email address.');
					setEmail(values.email);
					router.push('/verify-email');
				},
				onError: (ctx) => {
					toast.error(ctx.error.message);
				},
			},
		);
	};

	const emailValue = form.watch('email');

	useEffect(() => {
		form.setValue('name', emailValue, { shouldValidate: true });
	}, [form.setValue, emailValue]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-6'>
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
						<FormItem className='grid gap-2'>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									disabled={isPending}
									autoComplete='email'
									placeholder='joe.bloggs@example.com'
									className='rounded-lg shadow-sm'
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
						<FormItem className='grid gap-2'>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									disabled={isPending}
									autoComplete='new-password'
									placeholder='*******'
									type='password'
									className='rounded-lg shadow-sm'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' className='rounded-lg shadow-sm' disabled={isPending}>
					{isPending ? <Loading /> : 'Register'}
				</Button>
			</form>
		</Form>
	);
}
