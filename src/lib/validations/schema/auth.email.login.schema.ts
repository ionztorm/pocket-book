import { z } from 'zod';
import {
	getEmailSchema,
	getPasswordSchema,
} from '@/lib/validations/schema/auth.email.parts.schema';

export const LoginSchema = z.object({
	email: getEmailSchema(),
	password: getPasswordSchema('password'),
});
