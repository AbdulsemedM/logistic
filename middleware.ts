import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('travler-card-session');
  const isLoginPage = request.nextUrl.pathname === '/login';
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');
  const isRoot = request.nextUrl.pathname === '/';

  // If user is logged in and tries to access login page, redirect to dashboard
  if (isLoginPage && sessionCookie) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Allow API routes, login page, and root (which redirects)
  if (isApiRoute || isLoginPage || isRoot) {
    return NextResponse.next();
  }

  // Redirect to login if no session
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
