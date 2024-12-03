'use client';

import { LoginForm } from '@/app/(auth)/_components/login-form';
import { RegisterForm } from '@/app/(auth)/_components/register-form';
import { Card } from '@/components/ui/card';
import type { AuthOptions } from '@/lib/types/auth/auth.types';
import { useState } from 'react';
import { PasswordResetForm } from './password-reset-form';

export function AuthScreen() {
	const [selection, setSelection] = useState<AuthOptions>('login');

	return (
		<Card className='mx-auto w-full max-w-sm'>
			{selection === 'login' && <LoginForm onSelectAuthOption={setSelection} />}
			{selection === 'register' && <RegisterForm onSelectAuthOption={setSelection} />}
			{selection === 'passwordReset' && <PasswordResetForm onSelectAuthOption={setSelection} />}
		</Card>
	);
}
