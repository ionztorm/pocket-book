import type { PropsWithChildren } from 'react';
import type { Session } from '../auth';

export type ChildrenProps = Readonly<PropsWithChildren>;

export type UserMenuProps = Readonly<{
	side?: 'left' | 'right' | 'top' | 'bottom';
	align?: 'start' | 'center' | 'end';
	type?: 'sidebar' | 'landing';
	session: Session;
}>;

export type UserMenuContentProps = Omit<UserMenuProps, 'session'>;
