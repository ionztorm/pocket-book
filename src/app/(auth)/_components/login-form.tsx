import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { AuthPageComponentProps } from '@/lib/types/auth/auth.types';
import { SocialLoginButton } from './social-login-button';

export function LoginForm({ setState }: AuthPageComponentProps) {
	return (
		<>
			<CardHeader>
				<CardTitle className='text-2xl'>Login</CardTitle>
				<CardDescription>Enter your email below to login to your account</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='grid gap-4'>
					<div className='grid gap-2'>
						<Label htmlFor='email'>Email</Label>
						<Input id='email' type='email' placeholder='m@example.com' required />
					</div>
					<div className='grid gap-2'>
						<div className='flex items-center'>
							<Label htmlFor='password'>Password</Label>
							<Button
								variant='link'
								className='ml-auto inline-block text-sm underline'
								onClick={() => setState('passwordReset')}
							>
								Forgot your password?
							</Button>
						</div>
						<Input id='password' type='password' required />
					</div>
					<Button type='submit' className='w-full'>
						Login
					</Button>
					<SocialLoginButton icon={FcGoogle} provider='google' />
				</div>
				<div className='mt-4 text-center text-sm'>
					Don&apos;t have an account?{' '}
					<Button asChild variant='link' onClick={() => setState('register')}>
						<Link href='#' className='underline'>
							Sign up
						</Link>
					</Button>
				</div>
			</CardContent>
		</>
	);
}
