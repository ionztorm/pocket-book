import { LoginSchema } from '@/lib/validations/schema/auth.email.login.schema';
import { SignupSchema } from '@/lib/validations/schema/auth.email.signup.schema';
import { EnvironmentSchema } from '@/lib/validations/schema/env.var.schema';
import { z } from 'zod';

export type Environment = z.infer<typeof EnvironmentSchema>;
export type Login = z.infer<typeof LoginSchema>;
export type Signup = z.infer<typeof SignupSchema>;
