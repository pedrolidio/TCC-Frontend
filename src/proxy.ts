import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { handleAuthMiddleware } from '@/features/auth/middlewares';

export function proxy(request: NextRequest) {
  const authResponse = handleAuthMiddleware(request);

  if (authResponse) {
    return authResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};