import { useActionState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { UserRegistrationState, registerUser } from '@/actions/auth.actions';
import { LoginButtonSocial } from '@/app/(auth)/_components/login-button-social';
import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { AuthPageComponentProps } from '@/lib/types/auth/auth.types';

const initialState: UserRegistrationState = {
	errors: null,
	status: null,
};

export function RegisterForm({ onSelectAuthOption }: AuthPageComponentProps) {
	const [error, action, isPending] = useActionState(registerUser, initialState);
	return (
		<>
			<CardHeader>
				<CardTitle className='text-2xl'>Register</CardTitle>
				<CardDescription>Enter your email below to create an account</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='grid gap-4'>
					<form action={action} className='grid gap-4'>
						<div className='grid gap-2'>
							<Label htmlFor='name'>Name</Label>
							<Input id='name' name='name' type='text' placeholder='Joe Bloggs' required />
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='email'>Email</Label>
							<Input id='email' name='email' type='email' placeholder='m@example.com' required />
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='password'>Password</Label>
							<Input id='password' name='password' type='password' required />{' '}
							<Label htmlFor='confirmPassword'>Confirm Password</Label>
							<Input id='confirmPassword' name='confirmPassword' type='password' required />
						</div>
						<Button type='submit' className='w-full'>
							Register
						</Button>
					</form>
					<LoginButtonSocial icon={FcGoogle} provider='google' type='Register' />
				</div>
				<div className='mt-4 text-center text-sm'>
					Already have an account?{' '}
					<Button asChild variant='link' onClick={() => onSelectAuthOption('login')}>
						<Link href='#' className='underline'>
							Log in
						</Link>
					</Button>
				</div>
			</CardContent>
		</>
	);
}
