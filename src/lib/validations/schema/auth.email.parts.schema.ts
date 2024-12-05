import { string } from 'zod';

export const getNameSchema = () =>
	string({ required_error: 'Name is required' })
		.min(2, { message: 'Minimum 2 characters are required' })
		.max(20, { message: 'Maximum of 20 characters are allowed' });

export const getEmailSchema = () =>
	string({ required_error: 'Email is required' })
		.email({ message: 'Invalid email address' })
		.min(1, { message: 'Email is required' });

export const getPasswordSchema = (type: 'password' | 'confirmPassword') =>
	string({ required_error: `${type === 'password' ? type : 'password confirmation'} is required` })
		.min(8, { message: 'Password must be at least 6 characters long' })
		.max(20, { message: 'Password must be at most 20 characters long' });

export const getOTPSchema = () =>
	string()
		.min(6, { message: 'OTP must be 6 digits' })
		.max(6, { message: 'OTP must be 6 digits' })
		.regex(/^\d+$/, { message: 'OTP must contain only numbers' });
