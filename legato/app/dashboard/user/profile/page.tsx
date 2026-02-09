'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { 
  User, Mail, Phone, MapPin, Calendar, 
  Shield, Camera, Save, X, Upload 
} from 'lucide-react';

export default function ClientProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    dateOfBirth: '1990-05-15',
    occupation: 'Software Engineer',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // API call placeholder
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <DashboardLayout userType="client">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-gray-600">Manage your personal information</p>
          </div>
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
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
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
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
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    leftIcon={<Calendar className="h-4 w-4" />}
                    disabled={!isEditing}
                  />
                </div>
                <Input
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  leftIcon={<MapPin className="h-4 w-4" />}
                  disabled={!isEditing}
                />
                <Input
                  label="Occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Password</h3>
                    <p className="text-gray-600 text-sm">Last changed 3 months ago</p>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Two-Factor Authentication</h3>
                    <p className="text-gray-600 text-sm">Add an extra layer of security</p>
                  </div>
                  <Badge variant="outline">Not Enabled</Badge>
                </div>
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
                    <div className="h-32 w-32 rounded-full bg-gray-200 overflow-hidden">
                      {/* Placeholder avatar */}
                      <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                        <User className="h-16 w-16 text-gray-600" />
                      </div>
                    </div>
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 h-8 w-8 bg-black rounded-full flex items-center justify-center">
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
                    JPG, PNG or GIF, max 5MB
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Account Status */}
            <Card>
              <CardHeader>
                <CardTitle>Account Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-medium">Jan 15, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Type</span>
                    <Badge variant="success">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Bookings</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reviews Written</span>
                    <span className="font-medium">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="outline" className="w-full text-red-600 border-red-300 hover:bg-red-50">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}