'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getRoleFromCookiesClient } from '@/lib/auth';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Check user role from cookies
    const role = getRoleFromCookiesClient();
    
    if (role === 'client') {
      router.replace('/dashboard/user');
    } else if (role === 'lawyer') {
      router.replace('/dashboard/lawyer');
    } else {
      // No role found, redirect to login
      router.replace('/auth/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}