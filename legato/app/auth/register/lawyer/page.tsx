'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Mail, Lock, User, Phone, Briefcase, DollarSign, 
  FileText, Award, AlertCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
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

export default function RegisterLawyerPage() {
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
        verified: false,
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
    <div className="container max-w-4xl mx-auto py-12">
      <Card className="border-none shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-lg bg-black flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Join as Lawyer</CardTitle>
          <CardDescription>Register your legal practice on Legato</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
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

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+1 (555) 123-4567"
                  leftIcon={<Phone className="h-4 w-4" />}
                  disabled={loading}
                />

                <Input
                  label="Bar License Number"
                  type="text"
                  name="barLicense"
                  value={formData.barLicense}
                  onChange={handleChange}
                  placeholder="BAR-123456"
                  leftIcon={<Award className="h-4 w-4" />}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Professional Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Hourly Rate ($)"
                  type="number"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  required
                  min="0"
                  step="10"
                  placeholder="200"
                  leftIcon={<DollarSign className="h-4 w-4" />}
                  disabled={loading}
                />

                <Input
                  label="Years of Experience"
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  min="0"
                  max="60"
                  placeholder="5"
                  leftIcon={<Briefcase className="h-4 w-4" />}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Specializations */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Specializations *
              </label>
              <div className="flex flex-wrap gap-2">
                {specializations.map((spec) => (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => handleSpecializationToggle(spec)}
                    disabled={loading}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedSpecializations.includes(spec)
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
              {selectedSpecializations.length === 0 && (
                <p className="text-red-500 text-xs mt-2">Select at least one specialization</p>
              )}
            </div>

            {/* Languages */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Languages *
              </label>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => handleLanguageToggle(lang)}
                    disabled={loading}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedLanguages.includes(lang)
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Education & Bio */}
            <div className="grid md:grid-cols-2 gap-6">
              <Textarea
                label="Education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="J.D., Harvard Law School, 2015"
                disabled={loading}
              />

              <Textarea
                label="Professional Bio *"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
                placeholder="Describe your legal expertise, experience, and approach..."
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Account Security</h3>
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
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="h-4 w-4 mt-1 text-black border-gray-300 rounded focus:ring-black"
                disabled={loading}
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I confirm that I am a licensed attorney in good standing and agree to the{' '}
                <Link href="/terms" className="text-black hover:underline font-medium">
                  Terms of Service
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              loading={loading}
              fullWidth
              size="lg"
            >
              {loading ? 'Registering Practice...' : 'Register as Lawyer'}
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