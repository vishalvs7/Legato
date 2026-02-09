// FILE: middleware.ts
// PATH: /legato/middleware.ts
// PURPOSE: Protects routes and handles role-based authentication

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Public paths that don't require authentication
const publicPaths = [
  '/',                     // Homepage
  '/about',               // About page
  '/contact',             // Contact page
  '/lawyers',             // Lawyers marketplace
  '/auth/login',          // Login page
  '/auth/register',       // All register pages
  '/auth/forgot-password',// Password reset
  '/role-selector',       // Role selection
];

// Check if a path is public
function isPublicPath(pathname: string): boolean {
  // Exact match for public paths
  if (publicPaths.includes(pathname)) {
    return true;
  }
  
  // Dynamic public paths (lawyer profiles)
  if (pathname.match(/^\/lawyers\/[^\/]+$/)) {
    return true;
  }
  
  // API routes (most are public for MVP)
  if (pathname.startsWith('/api/')) {
    return true;
  }
  
  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get authentication data from cookies
  const token = request.cookies.get('legato-token')?.value;
  const role = request.cookies.get('legato-role')?.value;
  
  // 1. Allow public paths
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }
  
  // 2. Protect dashboard and private routes
  const isDashboardRoute = pathname.startsWith('/dashboard') || 
                          pathname.startsWith('/(user)') || 
                          pathname.startsWith('/(lawyer)');
  
  if (isDashboardRoute) {
    // Redirect to login if not authenticated
    if (!token) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // Role-based route protection
    if (role === 'user' && pathname.startsWith('/(lawyer)')) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    if (role === 'lawyer' && pathname.startsWith('/(user)')) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  // 3. Protect booking flow after lawyer selection
  if (pathname.startsWith('/lawyers/') && pathname.includes('/booking')) {
    if (!token) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

// Configure which paths middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/auth (authentication endpoints)
     * 2. /_next/static (static files)
     * 3. /_next/image (image optimization)
     * 4. /favicon.ico
     * 5. /public folder
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)',
  ],
};