import { Button } from '@/components/ui/button';
import { UserMenu } from '@/components/user-menu/user-menu';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';

export default async function Home() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	return (
		<div className='flex justify-between p-2'>
			<span>Pocket Book Landing Page</span>
			{!session && (
				<div className='flex gap-2'>
					<Button asChild size='sm'>
						<Link href='/auth'>Let&apos;s go!</Link>
					</Button>
				</div>
			)}
			{session && (
				<div className='flex gap-3'>
					<UserMenu type='landing' side='bottom' session={session} />
				</div>
			)}
		</div>
	);
}
