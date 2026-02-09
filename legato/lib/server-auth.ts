// FILE: lib/server-auth.ts (NEW - SERVER SIDE)
// PATH: /legato/lib/server-auth.ts
// PURPOSE: Server-side auth functions

import { cookies } from 'next/headers';

// Server-side cookie functions (for use in server components)
export async function setAuthCookiesServer(uid: string, role: 'client' | 'lawyer') {
  const cookieStore = await cookies();
  
  cookieStore.set('legato-token', uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
  
  cookieStore.set('legato-role', role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
}

export async function clearAuthCookiesServer() {
  const cookieStore = await cookies();
  cookieStore.delete('legato-token');
  cookieStore.delete('legato-role');
}

export async function getRoleFromCookiesServer(): Promise<'client' | 'lawyer' | null> {
  const cookieStore = await cookies();
  return cookieStore.get('legato-role')?.value as 'client' | 'lawyer' | null;
}