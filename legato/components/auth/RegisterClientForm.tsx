// FILE: RegisterClientForm.tsx
// PATH: /legato/components/auth/RegisterClientForm.tsx
// PURPOSE: Client registration with role assignment

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User, Phone, AlertCircle, Loader2 } from 'lucide-react';
import { registerUser } from '@/lib/firebase/auth';
import { setAuthCookiesClient } from '@/lib/auth';

export default function RegisterClientForm() {
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div>
        <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            required
            className="pl-10 input"
            placeholder="John Doe"
            disabled={loading}
          />
        </div>
      </div>

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
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number (Optional)
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="pl-10 input"
            placeholder="+1 (555) 123-4567"
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
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
            minLength={6}
          />
        </div>
        <p className="text-gray-500 text-xs mt-2">Must be at least 6 characters</p>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="pl-10 input"
            placeholder="••••••••"
            disabled={loading}
            minLength={6}
          />
        </div>
      </div>

      <div className="flex items-start">
        <input
          type="checkbox"
          id="terms"
          required
          className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black mt-1"
          disabled={loading}
        />
        <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
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

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin inline" />
            Creating Account...
          </>
        ) : (
          'Create Account'
        )}
      </button>

      <div className="text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-black hover:underline font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
}