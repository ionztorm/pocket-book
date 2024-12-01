'use server';

import { ApiError } from 'next/dist/server/api-utils';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { SignupSchema } from '@/lib/validations/schema/auth.email.signup.schema';

export type UserRegistrationState = {
	errors: FormErrors | null;
};
export type FormErrors = Readonly<{
	name?: string[];
	email?: string[];
	password?: string[];
	confirmPassword?: string[];
	signup?: string[];
}>;

export const registerUserAction = async (
	_: UserRegistrationState,
	formData: FormData,
): Promise<UserRegistrationState> => {
	console.log('formData', formData);
	const registrationFormData = Object.fromEntries(formData);
	console.log('registrationFormData', registrationFormData);

	const parsedFormData = SignupSchema.safeParse(registrationFormData);
	console.log('parsedFormData', parsedFormData);
	if (!parsedFormData.success) {
		return {
			errors: parsedFormData.error.flatten().fieldErrors,
		};
	}

	const signUpData = {
		name: parsedFormData.data.name,
		email: parsedFormData.data.email,
		password: parsedFormData.data.password,
	};

	try {
		await auth.api.signUpEmail({
			body: {
				...signUpData,
			},
		});
	} catch (error: unknown) {
		if (error instanceof ApiError) {
			return {
				errors: { signup: [error.message] },
			};
		}
	}

	redirect('/dashboard/todo');
};
