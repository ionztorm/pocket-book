import { getEmailSchema, getOTPSchema } from '@/lib/validations/schema/auth.email.parts.schema';
import { z } from 'zod';

export const LoginSchema = z.object({
	email: getEmailSchema(),
	otp: getOTPSchema(),
});

export const EmailSchema = z.object({
	email: getEmailSchema(),
});

export const OTPSchema = z.object({
	otp: getOTPSchema(),
});
