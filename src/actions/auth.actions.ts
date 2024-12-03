'use server';

import { auth } from '@/lib/auth';
import { formDataToObject } from '@/lib/utils';
import { SignupSchema } from '@/lib/validations/schema/auth.email.signup.schema';
import { ApiError } from 'next/dist/server/api-utils';
import { redirect } from 'next/navigation';

export type UserRegistrationState = {
	errors: FormErrors | null;
	status: 'success' | 'error' | null;
};
export type FormErrors = Readonly<{
	name?: string[];
	email?: string[];
	password?: string[];
	confirmPassword?: string[];
	database?: string[];
}>;

export const registerUser = async (
	_: UserRegistrationState,
	formData: FormData,
): Promise<UserRegistrationState> => {
	const registrationFormData = formDataToObject(formData);

	const parsedFormData = SignupSchema.safeParse(registrationFormData);
	if (!parsedFormData.success) {
		return {
			status: 'error',
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
				status: 'error',
				errors: { database: [error.message] },
			};
		}
	}

	redirect('/dashboard');
};
