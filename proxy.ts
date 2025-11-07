import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const proxy = async (request: NextRequest) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session && request.nextUrl.pathname === '/signup') {
    return NextResponse.redirect(new URL('/', request.url));
  } else if (session && request.nextUrl.pathname === '/signin') {
    return NextResponse.redirect(new URL('/', request.url));
  } else if (!session && request.nextUrl.pathname === '/verify') {
    return NextResponse.redirect(new URL('/', request.url));
  } else if (session && request.nextUrl.pathname === '/forgot-password') {
    return NextResponse.redirect(new URL('/', request.url));
  } else if (session && request.nextUrl.pathname === '/reset-password') {
    return NextResponse.redirect(new URL('/', request.url));
  } else if (!session && request.nextUrl.pathname === '/properties/add') {
    return NextResponse.redirect(new URL('/', request.url));
  } else if (!session && request.nextUrl.pathname === '/profile') {
    return NextResponse.redirect(new URL('/', request.url));
  } else if (!session && request.nextUrl.pathname === '/properties/saved') {
    return NextResponse.redirect(new URL('/properties', request.url));
  }
};
export const config = {
  matcher: [
    '/signup',
    '/signin',
    '/email/verify',
    '/forgot-password',
    '/reset-password',
    '/properties/add',
    '/profile',
    '/properties/saved',
  ],
};
