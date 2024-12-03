import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUserAction } from '@/actions/auth.actions';
import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { FormFieldRenderer } from '@/components/ui/form-field-renderer';
import { Loading } from '@/components/ui/loading';
import {
	AuthPageComponentProps,
	SignupFields,
	SignupFormErrors,
	SignupFormFields,
} from '@/lib/types/auth/auth.types';
import type { Signup } from '@/lib/types/validation.types';
import { getInputType } from '@/lib/utils';
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
						{signupFields.map((field) => (
							<FormFieldRenderer<SignupFields>
								key={field.name}
								control={form.control}
								fieldDetails={field}
								errors={errors}
								getInputType={getInputType}
								isPending={isPending}
							/>
						))}{' '}
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
