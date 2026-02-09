'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { BookingCard } from '@/components/dashboard/BookingCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Calendar, FileText, Clock, DollarSign, 
  TrendingUp, MessageSquare, Bell
} from 'lucide-react';
import Link from 'next/link';

export default function ClientDashboardPage() {
  // Mock data
  const stats = [
    {
      title: 'Upcoming Appointments',
      value: 3,
      icon: Calendar,
      trend: { value: 25, isPositive: true },
    },
    {
      title: 'Documents',
      value: 12,
      icon: FileText,
      trend: { value: 10, isPositive: true },
    },
    {
      title: 'Pending Reviews',
      value: 2,
      icon: MessageSquare,
    },
    {
      title: 'Total Spent',
      value: '$1,250',
      icon: DollarSign,
      trend: { value: 15, isPositive: false },
    },
  ];

  const bookings = [
    {
      id: '1',
      clientName: 'Sarah Johnson',
      service: 'Contract Review Consultation',
      date: 'Mar 20, 2024',
      time: '2:00 PM - 3:00 PM',
      duration: '1 hour',
      status: 'confirmed' as const,
      amount: 250,
      location: 'Video Call',
    },
    {
      id: '2',
      clientName: 'Michael Chen',
      service: 'Business Formation',
      date: 'Mar 22, 2024',
      time: '10:00 AM - 11:30 AM',
      duration: '1.5 hours',
      status: 'pending' as const,
      amount: 375,
      location: 'Video Call',
    },
    {
      id: '3',
      clientName: 'Maria Rodriguez',
      service: 'Family Law Consultation',
      date: 'Mar 18, 2024',
      time: '3:30 PM - 4:30 PM',
      duration: '1 hour',
      status: 'completed' as const,
      amount: 180,
      location: 'Video Call',
    },
  ];

  const handleBookingAction = (id: string, action: string) => {
    console.log(`Booking ${id}: ${action}`);
    // API call placeholder
  };

  return (
    <DashboardLayout userType="client">
      {/* Welcome Banner */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
        <p className="text-gray-600">Here's what's happening with your legal matters today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Bookings */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Bookings</h2>
            <Link href="/dashboard/user/bookings">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          
          <div className="space-y-4">
            {bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                {...booking}
                onAction={handleBookingAction}
              />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/lawyers">
                    <Button variant="outline" className="w-full h-20 flex-col">
                      <Calendar className="h-6 w-6 mb-2" />
                      <span>Book New</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/user/documents">
                    <Button variant="outline" className="w-full h-20 flex-col">
                      <FileText className="h-6 w-6 mb-2" />
                      <span>Documents</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/user/profile">
                    <Button variant="outline" className="w-full h-20 flex-col">
                      <MessageSquare className="h-6 w-6 mb-2" />
                      <span>Messages</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/user/billing">
                    <Button variant="outline" className="w-full h-20 flex-col">
                      <DollarSign className="h-6 w-6 mb-2" />
                      <span>Billing</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Appointment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Next Appointment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">Sarah Johnson</h3>
                    <p className="text-gray-600 text-sm">Corporate Law Expert</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">Today</p>
                    <p className="text-gray-500 text-sm">2:00 PM</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">1 hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Meeting ID:</span>
                    <span className="font-medium">LEG-1234</span>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button className="flex-1">Join Meeting</Button>
                  <Button variant="outline">Reschedule</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-3"></div>
                  <div>
                    <p className="font-medium">Document uploaded</p>
                    <p className="text-gray-500 text-sm">Contract_Review.pdf</p>
                    <p className="text-gray-400 text-xs">10 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-3"></div>
                  <div>
                    <p className="font-medium">Appointment confirmed</p>
                    <p className="text-gray-500 text-sm">With Michael Chen</p>
                    <p className="text-gray-400 text-xs">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-yellow-500 mt-2 mr-3"></div>
                  <div>
                    <p className="font-medium">Payment received</p>
                    <p className="text-gray-500 text-sm">$250.00</p>
                    <p className="text-gray-400 text-xs">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Find Lawyers CTA */}
          <Card className="bg-black text-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Need Legal Help?</h3>
                <p className="text-gray-300 mb-4">
                  Connect with verified lawyers across various specialties
                </p>
                <Link href="/lawyers">
                  <Button className="bg-white text-black hover:bg-gray-100 w-full">
                    Browse Lawyers
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}