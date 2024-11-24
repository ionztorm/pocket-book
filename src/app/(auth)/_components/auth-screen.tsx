'use client';

import { useState } from 'react';
import { LoginForm } from '@/app/(auth)/_components/login-form';
import { RegisterForm } from '@/app/(auth)/_components/register-form';
import { Card } from '@/components/ui/card';

export function AuthScreen() {
	const [selection, setSelection] = useState<'signUp' | 'signIn'>('signIn');

	return (
		<Card className='mx-auto w-full max-w-sm'>
			{selection === 'signIn' ? (
				<LoginForm setState={setSelection} />
			) : (
				<RegisterForm setState={setSelection} />
			)}
		</Card>
	);
}
