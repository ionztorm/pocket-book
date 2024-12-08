import { authClient } from '../auth-client';
import type { OtpEmailTypes } from '../types/auth/auth.types';

export async function sendOtpEmail(email: string, type: OtpEmailTypes) {
	const data = await authClient.emailOtp.sendVerificationOtp({
		email,
		type,
	});
	return data;
}

export async function verifyEmailWithOtp(email: string, otp: string) {
	const data = await authClient.emailOtp.verifyEmail({
		email,
		otp,
	});
	return data;
}

export async function signInWithOtp(email: string, otp: string) {
	const data = await authClient.signIn.emailOtp({
		email,
		otp,
	});
	return data;
}
