'use server';

import { APIError } from 'better-auth/api';
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

export const registerUserAction = async (formData: FormData): Promise<UserRegistrationState> => {
	const registrationFormData = Object.fromEntries(formData);

	const parsedFormData = SignupSchema.safeParse(registrationFormData);
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
		if (error instanceof APIError) {
			return {
				errors: { signup: [error.message] },
			};
		}
	}

	return { errors: null };
};
