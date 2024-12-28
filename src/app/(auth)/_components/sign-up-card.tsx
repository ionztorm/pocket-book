'use client';

import { AuthSpacer } from '@/app/(auth)/_components/auth-spacer';
import { SignUpForm } from '@/app/(auth)/_components/sign-up-form';
import { SocialLogins } from '@/app/(auth)/_components/social-logins';
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

export default function SignUpCard() {
	return (
		<Card className='mx-auto w-full max-w-sm'>
			<CardHeader className='text-center'>
				<CardTitle className='text-xl'>Create an account</CardTitle>
				<CardDescription>Create an account with your Google or GitHub account</CardDescription>
			</CardHeader>
			<CardContent className='grid gap-4'>
				<SocialLogins />
				<AuthSpacer text='or continue with' />
				<SignUpForm />
				<Separator />
			</CardContent>
			<CardFooter>
				<p className='w-full text-right text-muted-foreground text-sm'>
					Already have an account?{' '}
					<Link className='underline' href='/login'>
						Login
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
}
