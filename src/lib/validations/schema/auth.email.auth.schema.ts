import {
	getEmailSchema,
	getNameSchema,
	getOTPSchema,
	getPasswordSchema,
} from '@/lib/validations/schema/auth.email.parts.schema';
import { z } from 'zod';

export const SignupSchema = z.object({
	name: getNameSchema(),
	email: getEmailSchema(),
	password: getPasswordSchema('password'),
	// confirmPassword: getPasswordSchema('confirmPassword'),
});
// .refine((values) => values.confirmPassword === values.password, {
// 	message: 'Passwords do not match',
// 	path: ['confirmPassword'],
// });

export const LoginSchema = z.object({
	email: getEmailSchema(),
	password: getPasswordSchema('password'),
});

// parts
export const EmailSchema = z.object({
	email: getEmailSchema(),
});

export const OTPSchema = z.object({
	otp: getOTPSchema(),
});
