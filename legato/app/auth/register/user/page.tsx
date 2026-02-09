'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User, Phone, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { registerUser } from '@/lib/firebase/auth';
import { setAuthCookiesClient } from '@/lib/auth';

export default function RegisterUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      // Register with role = 'client'
      const userCredential = await registerUser(
        formData.email,
        formData.password,
        formData.displayName,
        'client',
        { phone: formData.phone }
      );

      // Set auth cookies
      setAuthCookiesClient(userCredential.user.uid, 'client');

      // Redirect to client dashboard
      router.push('/dashboard/user');

    } catch (err: any) {
      console.error('Registration error:', err);
      setError(
        err.code === 'auth/email-already-in-use'
          ? 'Email already registered'
          : err.message || 'Registration failed. Please try again.'
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
          <CardTitle className="text-2xl">Join as Client</CardTitle>
          <CardDescription>Create your account to find legal help</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                required
                placeholder="John Doe"
                leftIcon={<User className="h-4 w-4" />}
                disabled={loading}
              />

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
            </div>

            <Input
              label="Phone Number (Optional)"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              leftIcon={<Phone className="h-4 w-4" />}
              disabled={loading}
            />

            <div className="grid md:grid-cols-2 gap-6">
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
                helperText="At least 6 characters"
              />

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
                leftIcon={<Lock className="h-4 w-4" />}
                disabled={loading}
              />
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="h-4 w-4 mt-1 text-black border-gray-300 rounded focus:ring-black"
                disabled={loading}
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{' '}
                <Link href="/terms" className="text-black hover:underline font-medium">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-black hover:underline font-medium">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              loading={loading}
              fullWidth
              size="lg"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-black hover:underline font-medium">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}