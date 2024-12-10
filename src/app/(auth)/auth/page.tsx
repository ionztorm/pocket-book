import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from '../_components/login-form';
import { RegisterForm } from '../_components/register-form';

export default function AuthPage() {
	return (
		<Tabs defaultValue='register' className='mx-auto grid w-full max-w-sm '>
			<TabsList className='grid w-full grid-cols-2 gap-2 border'>
				<TabsTrigger value='register'>Register</TabsTrigger>
				<TabsTrigger value='login'>Login</TabsTrigger>
			</TabsList>
			<TabsContent value='register'>
				<RegisterForm />
			</TabsContent>
			<TabsContent value='login'>
				<LoginForm />
			</TabsContent>
		</Tabs>
	);
}
