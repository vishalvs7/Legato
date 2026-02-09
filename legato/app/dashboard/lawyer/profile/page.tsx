'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { 
  User, Mail, Phone, MapPin, Briefcase, 
  DollarSign, Globe, Award, Camera, 
  Save, X, Upload, CheckCircle, Star
} from 'lucide-react';

export default function LawyerProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah@lawfirm.com',
    phone: '+1 (555) 987-6543',
    location: 'New York, NY',
    hourlyRate: '250',
    experience: '12',
    bio: 'Corporate attorney with 12+ years of experience specializing in mergers and acquisitions, business formation, and corporate governance. Former general counsel at a Fortune 500 company.',
    barLicense: 'NYBAR-123456',
    education: 'J.D., Harvard Law School, 2011',
    languages: ['English', 'Spanish'],
    specialization: ['Corporate Law', 'Business Law', 'M&A'],
    verified: true,
  });

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
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSpecializationToggle = (spec: string) => {
    const current = formData.specialization.includes(spec)
      ? formData.specialization.filter(s => s !== spec)
      : [...formData.specialization, spec];
    setFormData({ ...formData, specialization: current });
  };

  const handleLanguageToggle = (lang: string) => {
    const current = formData.languages.includes(lang)
      ? formData.languages.filter(l => l !== lang)
      : [...formData.languages, lang];
    setFormData({ ...formData, languages: current });
  };

  const handleSave = () => {
    console.log('Saving lawyer profile:', formData);
    setIsEditing(false);
  };

  return (
    <DashboardLayout userType="lawyer">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Professional Profile</h1>
            <p className="text-gray-600">Manage your public profile and professional information</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={formData.verified ? "success" : "warning"} className="text-sm">
              {formData.verified ? (
                <>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified Lawyer
                </>
              ) : 'Pending Verification'}
            </Badge>
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    leftIcon={<User className="h-4 w-4" />}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    leftIcon={<Mail className="h-4 w-4" />}
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    leftIcon={<Phone className="h-4 w-4" />}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    leftIcon={<MapPin className="h-4 w-4" />}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Hourly Rate ($)"
                    name="hourlyRate"
                    type="number"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    leftIcon={<DollarSign className="h-4 w-4" />}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Years of Experience"
                    name="experience"
                    type="number"
                    value={formData.experience}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specializations
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {specializations.map((spec) => (
                      <button
                        key={spec}
                        type="button"
                        onClick={() => handleSpecializationToggle(spec)}
                        disabled={!isEditing}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                          formData.specialization.includes(spec)
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        } ${!isEditing ? 'cursor-default' : ''}`}
                      >
                        {spec}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Languages
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => handleLanguageToggle(lang)}
                        disabled={!isEditing}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                          formData.languages.includes(lang)
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        } ${!isEditing ? 'cursor-default' : ''}`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <Input
                  label="Bar License Number"
                  name="barLicense"
                  value={formData.barLicense}
                  onChange={handleChange}
                  leftIcon={<Award className="h-4 w-4" />}
                  disabled={!isEditing}
                />

                <Input
                  label="Education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  disabled={!isEditing}
                />

                <Textarea
                  label="Professional Bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={6}
                  disabled={!isEditing}
                  placeholder="Describe your legal expertise, experience, and approach..."
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Profile Photo */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Photo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="h-40 w-40 rounded-full bg-gray-200 overflow-hidden">
                      <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                        <User className="h-20 w-20 text-gray-600" />
                      </div>
                    </div>
                    {isEditing && (
                      <button className="absolute bottom-2 right-2 h-8 w-8 bg-black rounded-full flex items-center justify-center">
                        <Camera className="h-4 w-4 text-white" />
                      </button>
                    )}
                  </div>
                  {isEditing && (
                    <Button variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                  )}
                  <p className="text-gray-500 text-sm mt-2 text-center">
                    Recommended: 400x400px, JPG or PNG
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Public Profile Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Public Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Profile Views</span>
                    <span className="font-bold">1,248</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Client Rating</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-bold">4.9</span>
                      <span className="text-gray-500 ml-1">(128 reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Response Rate</span>
                    <span className="font-bold text-green-600">98%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Avg. Response Time</span>
                    <span className="font-bold">2.4 hours</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    View Public Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Verification Status */}
            <Card>
              <CardHeader>
                <CardTitle>Verification Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Email Verified</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Phone Verified</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">License Verified</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Identity Verified</span>
                    {formData.verified ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Badge variant="warning">Pending</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}