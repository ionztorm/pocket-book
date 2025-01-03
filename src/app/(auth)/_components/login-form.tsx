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
import type { LoginFormErrors } from '@/lib/types/auth/auth.types';
import type { Login } from '@/lib/types/validation.types';
import { LoginSchema } from '@/lib/validations/schema/auth.email.auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function LoginForm() {
	const [errors, _setErrors] = useState<LoginFormErrors | null>(null);
	const [_isOpen, _setIsOpen] = useState(false);
	const router = useRouter();
	const { setEmail } = useAuthenticationContext();
	const form = useForm<Login>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const isPending = form.formState.isSubmitting;

	const onSubmit = async (values: Login) => {
		console.log(values);
		setEmail(values.email);
		await authClient.signIn.email(
			{
				...values,
			},
			{
				onSuccess: () => {
					toast.success('Logged in');
					router.push('/dashboard/todo');
				},
				onError: (ctx) => {
					toast.error(ctx.error.message);
					console.log(ctx.error.message);
				},
			},
		);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-6'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem className='grid gap-2'>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									disabled={form.formState.isSubmitting}
									placeholder='joe.bloggs@example.com'
									autoComplete='email'
									type='email'
									className='rounded-lg shadow-sm'
									{...field}
								/>
							</FormControl>
							<FormMessage>{errors?.email ? errors.email : ''}</FormMessage>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem className='grid gap-2'>
							<div className='flex w-full items-center justify-between'>
								<FormLabel>Password</FormLabel>
								<Link
									href='/forgotten-password'
									className='text-muted-foreground text-sm hover:underline'
								>
									Forgot password?
								</Link>
							</div>
							<FormControl>
								<Input
									type='password'
									disabled={form.formState.isSubmitting}
									placeholder='*******'
									autoComplete='current-password'
									className='rounded-lg shadow-sm'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' className='w-full flex-1 rounded-lg shadow-sm'>
					{isPending ? <Loading /> : 'Login'}
				</Button>
			</form>
		</Form>
	);
}
