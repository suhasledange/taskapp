import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value ? true : false;

  if (path === '/' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  if (path !== '/' && !token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/dashboard',
  ],
};
