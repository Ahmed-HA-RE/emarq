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
  } else if (!session && request.nextUrl.pathname === '/email/verify') {
    return NextResponse.redirect(new URL('/', request.url));
  }
};
export const config = {
  matcher: ['/signup', '/signin', '/email/verify'],
};
