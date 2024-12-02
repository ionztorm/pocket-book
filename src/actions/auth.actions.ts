'use server';

import { APIError } from 'better-auth/api';
import { auth } from '@/lib/auth';
import { SignupFormErrors } from '@/lib/types/auth/auth.types';
import { Signup } from '@/lib/types/validation.types';
import { SignupSchema } from '@/lib/validations/schema/auth.email.signup.schema';

export type UserRegistrationState =
	| { errors: SignupFormErrors; name: null }
	| { errors: null; name: string };

export const registerUserAction = async (values: Signup): Promise<UserRegistrationState> => {
	const parsedFormData = SignupSchema.safeParse(values);
	if (!parsedFormData.success) {
		return {
			errors: parsedFormData.error.flatten().fieldErrors,
			name: null,
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
				name: null,
			};
		}

		return {
			errors: null,
			name: data.user.name,
		};
	} catch (error: unknown) {
		// Catch API errors and return a matching error message
		if (error instanceof APIError) {
			return {
				errors: { saving: [error.message] },
				name: null,
			};
		}

		// Handle unexpected errors in a consistent way
		return {
			errors: { saving: ['An unexpected error occurred'] },
			name: null,
		};
	}
};
