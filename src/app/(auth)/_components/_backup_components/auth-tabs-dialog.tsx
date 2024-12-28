import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';

export function AuthTabsDialog() {
	return (
		<>
			<DialogHeader className='grid gap-2'>
				<DialogTitle className='text-xl'>Register or Login</DialogTitle>
				<DialogDescription>
					Join us by registering a new account, or log back in if you're returning.
				</DialogDescription>
			</DialogHeader>
			<Tabs defaultValue='register' className='grid gap-2'>
				<TabsList className='grid grid-cols-2 gap-2'>
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
		</>
	);
}
