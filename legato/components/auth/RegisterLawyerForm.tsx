// FILE: RegisterLawyerForm.tsx
// PATH: /legato/components/auth/RegisterLawyerForm.tsx
// PURPOSE: Lawyer registration with specialized fields

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Mail, Lock, User, Phone, Briefcase, Award, 
  Globe, FileText, AlertCircle, Loader2, DollarSign 
} from 'lucide-react';
import { registerUser } from '@/lib/firebase/auth';
import { setAuthCookiesClient } from '@/lib/auth';

const specializations = [
  'Corporate Law',
  'Business Law',
  'Intellectual Property',
  'Family Law',
  'Criminal Defense',
  'Immigration Law',
  'Real Estate',
  'Employment Law',
  'Tax Law',
  'Estate Planning',
  'Personal Injury',
  'Bankruptcy',
];

const languages = [
  'English',
  'Spanish',
  'French',
  'German',
  'Mandarin',
  'Arabic',
  'Hindi',
  'Portuguese',
  'Russian',
  'Japanese',
];

export default function RegisterLawyerForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['English']);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    hourlyRate: '',
    experience: '',
    bio: '',
    barLicense: '',
    education: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSpecializationToggle = (spec: string) => {
    setSelectedSpecializations(prev =>
      prev.includes(spec)
        ? prev.filter(s => s !== spec)
        : [...prev, spec]
    );
  };

  const handleLanguageToggle = (lang: string) => {
    setSelectedLanguages(prev =>
      prev.includes(lang)
        ? prev.filter(l => l !== lang)
        : [...prev, lang]
    );
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

    if (selectedSpecializations.length === 0) {
      setError('Please select at least one specialization');
      setLoading(false);
      return;
    }

    try {
      // Prepare lawyer-specific data
      const lawyerData = {
        phone: formData.phone,
        specialization: selectedSpecializations,
        hourlyRate: parseFloat(formData.hourlyRate) || 0,
        experience: parseInt(formData.experience) || 0,
        bio: formData.bio,
        languages: selectedLanguages,
        barLicense: formData.barLicense,
        education: formData.education,
        verified: false, // Needs admin verification
      };

      // Register with role = 'lawyer'
      const userCredential = await registerUser(
        formData.email,
        formData.password,
        formData.displayName,
        'lawyer',
        lawyerData
      );

      // Set auth cookies
      setAuthCookiesClient(userCredential.user.uid, 'lawyer');

      // Redirect to lawyer dashboard
      router.push('/dashboard/lawyer');

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

      <div className="grid md:grid-cols-2 gap-6">
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
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="pl-10 input"
              placeholder="+1 (555) 123-4567"
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="barLicense" className="block text-sm font-medium text-gray-700 mb-2">
            Bar License Number
          </label>
          <div className="relative">
            <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="barLicense"
              name="barLicense"
              value={formData.barLicense}
              onChange={handleChange}
              className="pl-10 input"
              placeholder="BAR-123456"
              disabled={loading}
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-2">
            Hourly Rate ($)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              id="hourlyRate"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleChange}
              required
              min="0"
              step="10"
              className="pl-10 input"
              placeholder="200"
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
            Years of Experience
          </label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              min="0"
              max="60"
              className="pl-10 input"
              placeholder="5"
              disabled={loading}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Specializations *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {specializations.map((spec) => (
            <button
              key={spec}
              type="button"
              onClick={() => handleSpecializationToggle(spec)}
              className={`px-3 py-2 rounded-lg text-sm text-center transition-colors ${
                selectedSpecializations.includes(spec)
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              disabled={loading}
            >
              {spec}
            </button>
          ))}
        </div>
        {selectedSpecializations.length === 0 && (
          <p className="text-red-500 text-xs mt-2">Select at least one specialization</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Languages *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {languages.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => handleLanguageToggle(lang)}
              className={`px-3 py-2 rounded-lg text-sm text-center transition-colors ${
                selectedLanguages.includes(lang)
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              disabled={loading}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-2">
          Education
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <textarea
            id="education"
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="pl-10 input min-h-[100px]"
            placeholder="J.D., Harvard Law School, 2015"
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
          Professional Bio
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            required
            className="pl-10 input min-h-[120px]"
            placeholder="Describe your legal expertise, experience, and approach..."
            disabled={loading}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
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
          <p className="text-gray-500 text-xs mt-2">At least 6 characters</p>
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
          I confirm that I am a licensed attorney in good standing and agree to the{' '}
          <Link href="/terms" className="text-black hover:underline font-medium">
            Terms of Service
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
            Registering Practice...
          </>
        ) : (
          'Register as Lawyer'
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