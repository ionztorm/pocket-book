import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUserAction } from '@/actions/auth.actions';
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
import {
	AuthPageComponentProps,
	SignupFormErrors,
	SignupFormFields,
} from '@/lib/types/auth/auth.types';
import type { Signup } from '@/lib/types/validation.types';
import { capitalise } from '@/lib/utils';
import { SignupSchema } from '@/lib/validations/schema/auth.email.signup.schema';
import { SocialLogins } from './social-logins';

const signupFields: SignupFormFields[] = [
	{ name: 'name', placeholder: 'Joe Bloggs' },
	{ name: 'email', placeholder: 'e@mai.l' },
	{ name: 'password', placeholder: '••••••••' },
	{ name: 'confirmPassword', placeholder: '••••••••' },
];

export function RegisterForm({ onSelectAuthOption }: AuthPageComponentProps) {
	const [errors, setErrors] = useState<SignupFormErrors | null>(null);
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
			toast.error(result.errors.saving?.[0] || 'An error occurred');
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
						{signupFields.map(({ name, placeholder }) => (
							<FormField
								key={name}
								control={form.control}
								name={name}
								render={({ field }) => (
									<FormItem>
										<FormLabel>{capitalise(name)}</FormLabel>
										<FormControl>
											<Input
												disabled={isPending}
												placeholder={placeholder}
												{...field}
												type={
													name === 'email' ? 'email' : name === 'password' ? 'password' : 'text'
												}
											/>
										</FormControl>
										<FormMessage>{errors?.[name] ? errors[name] : ''}</FormMessage>
									</FormItem>
								)}
							/>
						))}
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
