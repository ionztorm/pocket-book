import {
	getEmailSchema,
	getNameSchema,
	getPasswordSchema,
} from '@/lib/validations/schema/auth.email.parts.schema';
import { z } from 'zod';

export const SignupSchema = z
	.object({
		name: getNameSchema(),
		email: getEmailSchema(),
		password: getPasswordSchema('password'),
		confirmPassword: getPasswordSchema('confirmPassword'),
	})
	.refine((values) => values.confirmPassword === values.password, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});
