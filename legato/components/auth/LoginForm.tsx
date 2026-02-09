// FILE: LoginForm.tsx
// PATH: /legato/components/auth/LoginForm.tsx
// PURPOSE: Login form with role-based redirection

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { loginUser, getUserProfile } from '@/lib/firebase/auth';
import { setAuthCookiesClient } from '@/lib/auth';

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Login with Firebase
      const userCredential = await loginUser(formData.email, formData.password);
      
      // 2. Get user profile with role
      const userProfile = await getUserProfile(userCredential.user.uid);
      
      if (!userProfile) {
        throw new Error('User profile not found');
      }

      // 3. Set auth cookies
      setAuthCookiesClient(userCredential.user.uid, userProfile.role);

      // 4. Redirect based on role
      if (userProfile.role === 'client') {
        router.push('/dashboard/user');
      } else if (userProfile.role === 'lawyer') {
        router.push('/dashboard/lawyer');
      } else {
        router.push('/dashboard');
      }

    } catch (err: any) {
      console.error('Login error:', err);
      setError(
        err.code === 'auth/invalid-credential' 
          ? 'Invalid email or password'
          : err.message || 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="pl-10 input"
            placeholder="you@example.com"
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <Link 
            href="/auth/forgot-password" 
            className="text-sm text-black hover:underline font-medium"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="pl-10 input"
            placeholder="••••••••"
            disabled={loading}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin inline" />
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">New to Legato?</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Link
          href="/auth/register/user"
          className="btn-secondary py-3 text-center"
        >
          Join as Client
        </Link>
        <Link
          href="/auth/register/lawyer"
          className="btn-primary py-3 text-center"
        >
          Join as Lawyer
        </Link>
      </div>
    </form>
  );
}