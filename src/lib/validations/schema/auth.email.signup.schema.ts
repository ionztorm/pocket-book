import { getEmailSchema, getNameSchema } from '@/lib/validations/schema/auth.email.parts.schema';
import { z } from 'zod';

export const SignupSchema = z.object({
	name: getNameSchema(),
	email: getEmailSchema(),
});
