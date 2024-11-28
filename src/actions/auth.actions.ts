'use server';

import { ZodError } from 'zod';
import { SignupSchema } from '@/lib/validations/schema/auth.email.signup.schema';

export type SignupState = {
	error: ZodError<{ name: string; email: string; password: string }> | null;
	data: string | null;
};

export const registerUser = async (_: SignupState, formData: FormData): Promise<SignupState> => {
	const parsedFormData = SignupSchema.safeParse(formData);
	if (!parsedFormData.success) {
		return {
			data: null,
			error: parsedFormData.error,
		};
	}

	return {
		data: 'Registration Success!',
		error: null,
	};
};
