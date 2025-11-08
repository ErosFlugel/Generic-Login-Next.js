// import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './app/lib/session';

// const protectedRoutes = ['/dashboard'];
const protectedRoutes = ['/', '/dashboard'];
const publicRoutes = ['/login'];

export default async function proxy(req) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // const cookieStore = await cookies();
  // const cookie = cookieStore.get('session')?.value;
  const cookie = req.cookies.get('session')?.value;
  const session = await decrypt(cookie);

  // Redirect to login if user tries to go to a protected route by config matcher
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // Redirect to /dashboard if user is already logged in
  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*', // Matches /dashboard and any sub-pathss
    '/profile', // Matches /profile exactly
    '/api/:path*', // Matches /api and any sub-paths
    '/login',
    '/',
  ],
};
