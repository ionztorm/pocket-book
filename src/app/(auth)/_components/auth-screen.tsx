'use client';

import { useState } from 'react';
import { LoginForm } from '@/app/(auth)/_components/login-form';
import { RegisterForm } from '@/app/(auth)/_components/register-form';
import { Card } from '@/components/ui/card';
import type { AuthOptions } from '@/lib/types/auth/auth.types';
import { PasswordResetForm } from './password-reset-form';

export function AuthScreen() {
	const [selection, setSelection] = useState<AuthOptions>('login');

	return (
		<Card className='mx-auto w-full max-w-sm'>
			{selection === 'login' && <LoginForm setState={setSelection} />}
			{selection === 'register' && <RegisterForm setState={setSelection} />}
			{selection === 'passwordReset' && <PasswordResetForm setState={setSelection} />}
		</Card>
	);
}
