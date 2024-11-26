import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type UserAvatarProps = {
	name?: string;
	image?: string | null;
	size?: 'sm' | 'lg' | 'md' | 'profile';
	className?: string;
};

const sizes = {
	sm: 'size-5',
	md: 'size-8',
	lg: 'size-10',
	profile: 'max-w-[256px] max-h-[256px] size-full',
};

export const UserAvatar = ({ name, image, size = 'lg', className }: UserAvatarProps) => {
	const avatarFallback = name?.charAt(0).toUpperCase();
	return (
		<Avatar className={cn('rounded-md transition hover:opacity-75', sizes[size], className)}>
			<AvatarImage alt={name} src={image ?? undefined} />
			<AvatarFallback
				className={cn(
					'aspect-square rounded-md bg-primary font-bold text-slate-200',
					size === 'sm' && 'text-xs',
					size === 'profile' && 'text-6xl',
				)}
			>
				{avatarFallback}
			</AvatarFallback>
		</Avatar>
	);
};
