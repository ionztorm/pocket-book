import { betterFetch } from '@better-fetch/fetch';
import type { Session } from 'better-auth/types';
import { type NextRequest, NextResponse } from 'next/server';

export default async function middlware(request: NextRequest) {
	const { data: session } = await betterFetch<Session>('/api/auth/get-session', {
		baseURL: request.nextUrl.origin,
		headers: {
			//get the cookie from the request
			cookie: request.headers.get('cookie') ?? '',
		},
	});

	// accessing /dashboard/* while not logged in -> auth
	if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	// accessing /auth or /dashboard while logged in -> todos
	if (
		session &&
		(request.nextUrl.pathname.startsWith('/sign-up') ||
			request.nextUrl.pathname.startsWith('/sign-up') ||
			request.nextUrl.pathname.startsWith('/verify-email') ||
			request.nextUrl.pathname.endsWith('/dashboard'))
	) {
		return NextResponse.redirect(new URL('/dashboard/todo', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/dashboard', '/dashboard/:path*', '/sign-up', '/verify-email', '/login'],
};
