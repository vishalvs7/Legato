import React from 'react';
import Link from 'next/link';
import { Scale } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBack?: boolean;
}

export default function AuthLayout({ 
  children, 
  title, 
  subtitle, 
  showBack = true 
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto"> {/* Added container */}
        {/* Header */}
        <div className="text-center mb-8">
          {showBack && (
            <div className="mb-6">
              <Link 
                href="/" 
                className="inline-flex items-center text-gray-600 hover:text-black text-sm"
              >
                ← Back to home
              </Link>
            </div>
          )}
          
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-lg bg-black flex items-center justify-center">
              <Scale className="h-6 w-6 text-white" />
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
          {subtitle && (
            <p className="text-gray-600">{subtitle}</p>
          )}
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          {children}
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="text-black hover:underline font-medium">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-black hover:underline font-medium">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}