import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RegisterForm } from '../_components/register-form';

export default function SignUpCard() {
	return (
		<Card className='mx-auto w-full max-w-sm'>
			<CardHeader>
				<CardTitle className='text-2xl'>Create an account</CardTitle>
				<CardDescription>Sign up</CardDescription>
			</CardHeader>
			<CardContent className='grid gap-4'>
				<RegisterForm />
			</CardContent>
		</Card>
	);
}
