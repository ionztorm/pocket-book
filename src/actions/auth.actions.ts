'use server';

import { auth } from '@/lib/auth';
import type { LoginFormErrors, SignupFormErrors } from '@/lib/types/auth/auth.types';
import type { Login, Signup } from '@/lib/types/validation.types';
import { LoginSchema } from '@/lib/validations/schema/auth.email.login.schema';
import { SignupSchema } from '@/lib/validations/schema/auth.email.signup.schema';
import { APIError } from 'better-auth/api';

export type UserRegistrationState = { errors: SignupFormErrors | null };

export const registerUserAction = async (values: Signup): Promise<UserRegistrationState> => {
	const parsedFormData = SignupSchema.safeParse(values);
	if (!parsedFormData.success) {
		return {
			errors: parsedFormData.error.flatten().fieldErrors,
		};
	}

	// passwords must match at this point so remove confirmPassword
	const signUpData = {
		name: parsedFormData.data.name,
		email: parsedFormData.data.email,
		password: parsedFormData.data.password,
	};

	try {
		const data = await auth.api.signUpEmail({
			body: {
				...signUpData,
			},
		});

		if (!data?.user?.name) {
			return {
				errors: { saving: ['Unexpected response: user name is missing'] },
			};
		}

		return {
			errors: null,
		};
	} catch (error: unknown) {
		// Catch API errors and return a matching error message
		if (error instanceof APIError) {
			return {
				errors: { saving: [error.message] },
			};
		}

		// Handle unexpected errors in a consistent way
		return {
			errors: { saving: ['An unexpected error occurred'] },
		};
	}
};

export type LoginFormState = { errors: LoginFormErrors | null };

export const loginUserAction = async (values: Login): Promise<LoginFormState> => {
	const parsedFormData = LoginSchema.safeParse(values);

	if (!parsedFormData.success) {
		return {
			errors: parsedFormData.error.flatten().fieldErrors,
		};
	}

	try {
		await auth.api.signInEmail({
			body: {
				...parsedFormData.data,
			},
		});
		return {
			errors: null,
		};
	} catch (error: unknown) {
		if (error instanceof APIError)
			return {
				errors: { saving: ['There was an issue logging in'] },
			};
		return {
			errors: { saving: ['An unexpected error occurred'] },
		};
	}
};
