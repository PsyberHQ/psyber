import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log('Middleware is running', path);
  try {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (!token && path !== '/app/login') {
      return NextResponse.redirect(new URL('/app/login', request.url));
    }
    if (!token && path === '/app/login') {
      return NextResponse.next();
    }
    if (path === '/app/login') {
      return NextResponse.redirect(new URL('/app', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error in middleware:', error);
    return NextResponse.redirect(new URL('/app/login', request.url));
  }
}

export const config = {
  matcher: ['/app/:path*', '/api/init-quiz', '/api/user-level'],
};
