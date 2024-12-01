'use server';

import { APIError } from 'better-auth/api';
import { auth } from '@/lib/auth';
import { SignupSchema } from '@/lib/validations/schema/auth.email.signup.schema';

export type UserRegistrationState =
	| { errors: FormErrors; name: null }
	| { errors: null; name: string };
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
			name: null,
		};
	}

	const signUpData = {
		name: parsedFormData.data.name,
		email: parsedFormData.data.email,
		password: parsedFormData.data.password,
	};

	let name;
	try {
		const data = await auth.api.signUpEmail({
			body: {
				...signUpData,
			},
		});
		name = data?.user?.name;
	} catch (error: unknown) {
		if (error instanceof APIError) {
			return {
				errors: { signup: [error.message] },
				name: null,
			};
		}
	}

	return { errors: null, name: name ?? null };
};
