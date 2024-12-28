import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { AuthCardProps } from '@/lib/types/auth/auth.types';

export function AuthCard({ children, title, description }: AuthCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-2xl'>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className='grid gap-4'>{children}</CardContent>
		</Card>
	);
}
