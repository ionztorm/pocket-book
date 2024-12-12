import type { ChildrenProps } from '@/lib/types/global.types';

export default function AuthLayout({ children }: ChildrenProps) {
	return <div className='grid min-h-[100dvh] w-full place-items-center'>{children}</div>;
}
