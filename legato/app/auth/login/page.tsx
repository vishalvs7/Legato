'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { loginUser, getUserProfile } from '@/lib/firebase/auth';
import { setAuthCookiesClient } from '@/lib/auth';

export default function LoginPage() {
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
    <div className="container max-w-md mx-auto py-12">
      <Card className="border-none shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-lg bg-black flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              leftIcon={<Mail className="h-4 w-4" />}
              disabled={loading}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              leftIcon={<Lock className="h-4 w-4" />}
              disabled={loading}
              helperText={
                <Link href="/auth/forgot-password" className="text-black hover:underline">
                  Forgot password?
                </Link>
              }
            />

            <Button
              type="submit"
              loading={loading}
              fullWidth
              size="lg"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">New to Legato?</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Link href="/auth/register/user">
                <Button variant="outline" fullWidth>
                  Join as Client
                </Button>
              </Link>
              <Link href="/auth/register/lawyer">
                <Button fullWidth>
                  Join as Lawyer
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <p className="text-gray-600 text-sm">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="text-black hover:underline font-medium">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-black hover:underline font-medium">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}