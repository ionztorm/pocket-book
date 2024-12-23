'use client';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { LoginForm } from '../_components/login-form';
import { AuthSpacer } from './auth-spacer';
import { SocialLogins } from './social-logins';

export function LoginCard() {
	return (
		<Card className='mx-auto w-full max-w-sm'>
			<CardHeader className='text-center'>
				<CardTitle className='text-xl'>Login</CardTitle>
				<CardDescription>Login with your Google or GitHub account</CardDescription>
			</CardHeader>
			<CardContent className='grid gap-4'>
				<SocialLogins />
				<AuthSpacer text='or continue with' />
				<LoginForm />
				<Separator />
			</CardContent>
			<CardFooter>
				<p className='w-full text-right text-muted-foreground text-sm'>
					Are you new here?{' '}
					<Link className='underline' href='/sign-up'>
						Register
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
}
