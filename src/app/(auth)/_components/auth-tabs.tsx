import { LoginForm } from '@/app/(auth)/_components/login-form';
import { RegisterForm } from '@/app/(auth)/_components/register-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AuthCard } from './auth-card';

export function AuthTabs() {
	return (
		<Tabs defaultValue='register' className='mx-auto grid w-full max-w-sm '>
			<TabsList className='grid w-full grid-cols-2 gap-2 border'>
				<TabsTrigger value='register'>Register</TabsTrigger>
				<TabsTrigger value='login'>Login</TabsTrigger>
			</TabsList>
			<TabsContent value='register'>
				<AuthCard title='Welcome aboard!' description='Enter your login details to get started...'>
					<RegisterForm />
				</AuthCard>
			</TabsContent>
			<TabsContent value='login'>
				<AuthCard title='Welcome back!' description='Enter your details to continue...'>
					<LoginForm />
				</AuthCard>
			</TabsContent>
		</Tabs>
	);
}
