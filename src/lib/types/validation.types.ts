import type { EnvironmentSchema } from '@/lib/validations/schema/env.var.schema';
import type { z } from 'zod';
import type {
	EmailSchema,
	LoginSchema,
	OTPSchema,
	SignupSchema,
} from '../validations/schema/auth.email.auth.schema';

export type Environment = z.infer<typeof EnvironmentSchema>;
export type Login = z.infer<typeof LoginSchema>;
export type Signup = z.infer<typeof SignupSchema>;
export type Email = z.infer<typeof EmailSchema>;
export type OTP = z.infer<typeof OTPSchema>;
