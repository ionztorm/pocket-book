import {
	getEmailSchema,
	getPasswordSchema,
} from '@/lib/validations/schema/auth.email.parts.schema';
import { z } from 'zod';

export const LoginSchema = z.object({
	email: getEmailSchema(),
	password: getPasswordSchema('password'),
});
