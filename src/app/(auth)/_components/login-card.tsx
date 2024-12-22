import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from '../_components/login-form';

export function LoginCard() {
	return (
		<Card className='mx-auto w-full max-w-sm'>
			<CardHeader>
				<CardTitle className='text-2xl'>Login</CardTitle>
				<CardDescription>Login</CardDescription>
			</CardHeader>
			<CardContent className='grid gap-4'>
				<LoginForm />
			</CardContent>
		</Card>
	);
}
