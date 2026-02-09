// FILE: lib/auth.ts (NEW - CLIENT SIDE COOKIES)
// PATH: /legato/lib/auth.ts
// PURPOSE: Client-side cookie functions

// Client-side cookie functions (for use in components)
export function setAuthCookiesClient(uid: string, role: 'client' | 'lawyer') {
  // Set cookies with document.cookie (client-side)
  document.cookie = `legato-token=${uid}; path=/; max-age=${60 * 60 * 24 * 7}`;
  document.cookie = `legato-role=${role}; path=/; max-age=${60 * 60 * 24 * 7}`;
}

export function clearAuthCookiesClient() {
  document.cookie = 'legato-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = 'legato-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}

export function getRoleFromCookiesClient(): 'client' | 'lawyer' | null {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'legato-role') {
      return value as 'client' | 'lawyer';
    }
  }
  return null;
}