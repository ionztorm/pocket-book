import type {
	EmailSchema,
	LoginSchema,
	OTPSchema,
} from '@/lib/validations/schema/auth.email.login.schema';
import type { SignupSchema } from '@/lib/validations/schema/auth.email.signup.schema';
import type { EnvironmentSchema } from '@/lib/validations/schema/env.var.schema';
import type { z } from 'zod';

export type Environment = z.infer<typeof EnvironmentSchema>;
export type Login = z.infer<typeof LoginSchema>;
export type Signup = z.infer<typeof SignupSchema>;
export type Email = z.infer<typeof EmailSchema>;
export type OTP = z.infer<typeof OTPSchema>;
