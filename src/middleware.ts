import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('psyber_token')?.value;
  const path = request.nextUrl.pathname;
  
  // If accessing /app routes and no API token, check for NextAuth session
  if (path.startsWith('/app') && !token) {
    // Let NextAuth handle the authentication at the component level
    return NextResponse.next();
  }
  
  // If accessing /psyber-auth/onboarding and no token, redirect to login
  if (path.startsWith('/psyber-auth/onboarding') && !token) {
    return NextResponse.redirect(new URL('/psyber-auth/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/app/:path*', '/psyber-auth/onboarding/:path*'],
};