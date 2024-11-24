import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { AuthPageComponentProps } from '@/lib/types/auth/auth.types';

export function PasswordResetForm({ setState }: AuthPageComponentProps) {
	return (
		<>
			<CardHeader>
				<CardTitle className='text-2xl'>Password Reset</CardTitle>
				<CardDescription>Enter your email below to reset your password</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='grid gap-4'>
					<div className='grid gap-2'>
						<Label htmlFor='email'>Email</Label>
						<Input id='email' type='email' placeholder='m@example.com' required />
					</div>
					<Button type='submit' className='w-full'>
						Submit
					</Button>
					<Button variant='link' className='w-full' onClick={() => setState('login')}>
						Wait, I remembered it, log me in!
					</Button>
				</div>
			</CardContent>
		</>
	);
}
