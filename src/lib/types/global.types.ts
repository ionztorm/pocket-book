import type { PropsWithChildren } from 'react';
import type { Session } from '../auth';
import type { ClientSession } from '../auth-client';

export type ChildrenProps = Readonly<PropsWithChildren>;

export type UserMenuProps = Readonly<{
	side?: 'left' | 'right' | 'top' | 'bottom';
	align?: 'start' | 'center' | 'end';
	type?: 'sidebar' | 'landing';
	session: Session | ClientSession;
}>;

export type UserMenuContentProps = Omit<UserMenuProps, 'session'>;
