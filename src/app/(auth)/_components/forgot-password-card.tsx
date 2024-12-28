'use client';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export function ForgotPasswordCard() {
	return (
		<Card className='mx-auto w-full max-w-md'>
			<CardHeader className='text-center'>
				<CardTitle className='text-xl'>Forgotten Password</CardTitle>
				<CardDescription>
					Enter your password. If it exists in our database, we'll send you an email with
					instructions to reset it. Remember to check your spam folder. Perhaps you should remember
					it next time 😉.
				</CardDescription>
			</CardHeader>
			<CardContent className='grid gap-4'>
				<p>A reset form will go here</p>
			</CardContent>

			<CardFooter>
				<p className='w-full text-center text-muted-foreground text-sm'>
					Hold up! I've remembered my password!{' '}
					<Link className='underline' href='/login'>
						Back to login
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
}
