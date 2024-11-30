import { Loader } from 'lucide-react';

export function Loading() {
	return (
		<span className='grid h-full place-content-center'>
			<Loader className='size-6 animate-spin text-primary-foreground' />
		</span>
	);
}
