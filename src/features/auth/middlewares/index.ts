import { NextRequest, NextResponse } from 'next/server';
import { decodeJWTPayload } from '../utils/jwt';
import { PERMISSIONS } from '../constants';

export function handleAuthMiddleware(request: NextRequest) {
  const token = request.cookies.get('session_token')?.value;
  const currentPath = request.nextUrl.pathname;
  
  const isLoginPage = currentPath === '/';
  const isProtectedRoute = !isLoginPage; 

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isLoginPage && token) {
    return NextResponse.redirect(new URL('/vehicles', request.url));
  }

  if (token) {
    const user = decodeJWTPayload(token);

    if (!user) {
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.delete('session_token');
      return response;
    }
    
    if (currentPath.startsWith('/vehicles')) {
      const userRole = user.role_id;
      const allowedRoles = PERMISSIONS.VEHICLES;

      if (!allowedRoles.includes(userRole)) {
        return NextResponse.rewrite(new URL('/unauthorized', request.url));
      }
    }
  }

  return null;
}