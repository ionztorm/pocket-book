'use server';

import { formDataToObject } from '@/lib/utils';
import { SignupSchema } from '@/lib/validations/schema/auth.email.signup.schema';

export type UserRegistrationState = {
	errors: FormErrors | null;
	status: 'success' | 'error' | null;
};
export type FormErrors = Readonly<{
	name?: string[];
	email?: string[];
	password?: string[];
	confirmPassword?: string[];
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

	//// confirm passwords match
	//if (parsedFormData.data.password !== parsedFormData.data.confirmPassword) {
	//	return {
	//		status: 'error',
	//		errors: { confirmPassword: ['Passwords do not match'] },
	//	};
	//}

	// TODO: signup

	return {
		status: 'success',
		errors: null,
	};
};
