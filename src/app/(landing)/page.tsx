import { headers } from 'next/headers';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserMenu } from '@/components/user-menu/user-menu';
import { auth } from '@/lib/auth';

export default async function Home() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	return (
		<div className='flex justify-between p-4'>
			<span>Pocket Book Landing Page</span>
			{!session && (
				<Button asChild>
					<Link href='/auth'>Login</Link>
				</Button>
			)}
			{session && (
				<div className='flex gap-3'>
					<UserMenu type='landing' side='bottom' />
				</div>
			)}
		</div>
	);
}
