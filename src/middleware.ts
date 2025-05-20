import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('psyber_token')?.value;
  const path = request.nextUrl.pathname;
  
  // Add a debug log
  console.log(`Middleware checking path: ${path}`);

  // Only handle specific paths
  if (path.startsWith('/psyber-auth/onboarding') && !token) {
    console.log('Middleware: Redirecting from onboarding to login due to missing token');
    return NextResponse.redirect(new URL('/psyber-auth/login', request.url));
  }
  
  // Let client-side auth handle the rest
  return NextResponse.next();
}

// Update matcher to be more specific and exclude task paths
export const config = {
  matcher: ['/psyber-auth/onboarding/:path*'],
};