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
		<div className='flex items-center justify-between p-2 text-neutral-50'>
			<span className='font-black text-2xl'>PB</span>
			{!session && (
				<div className='flex gap-2'>
					<Button asChild size='sm' variant='ghost'>
						<Link href='/login'>Login</Link>
					</Button>
					<Button asChild size='sm'>
						<Link href='/sign-up'>Sign-up</Link>
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
