'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { BookingCard } from '@/components/dashboard/BookingCard';
import { TodoList } from '@/components/dashboard/TodoList';
import { EarningsChart } from '@/components/dashboard/EarningsChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  DollarSign, Calendar, Users, TrendingUp,
  Clock, Briefcase, MessageSquare, FileText
} from 'lucide-react';
import Link from 'next/link';

export default function LawyerDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'earnings' | 'todo'>('overview');

  // Mock data
  const stats = [
    {
      title: 'Total Earnings',
      value: '$12,450',
      icon: DollarSign,
      trend: { value: 12, isPositive: true },
      description: 'This month',
    },
    {
      title: 'Upcoming Appointments',
      value: 8,
      icon: Calendar,
      trend: { value: 25, isPositive: true },
      description: 'Next 7 days',
    },
    {
      title: 'Active Clients',
      value: 24,
      icon: Users,
      trend: { value: 8, isPositive: true },
      description: 'This month',
    },
    {
      title: 'Avg. Response Time',
      value: '2.4h',
      icon: Clock,
      trend: { value: 15, isPositive: true },
      description: 'Faster than average',
    },
  ];

  const bookings = [
    {
      id: '1',
      clientName: 'John Anderson',
      service: 'Contract Review',
      date: 'Today',
      time: '2:00 PM - 3:00 PM',
      duration: '1 hour',
      status: 'confirmed' as const,
      amount: 250,
      location: 'Video Call',
    },
    {
      id: '2',
      clientName: 'Sarah Miller',
      service: 'Business Formation',
      date: 'Tomorrow',
      time: '10:00 AM - 11:30 AM',
      duration: '1.5 hours',
      status: 'confirmed' as const,
      amount: 375,
      location: 'Video Call',
    },
    {
      id: '3',
      clientName: 'Robert Chen',
      service: 'Legal Consultation',
      date: 'Mar 22, 2024',
      time: '3:30 PM - 4:00 PM',
      duration: '30 mins',
      status: 'pending' as const,
      amount: 125,
      location: 'Video Call',
    },
  ];

  const todoItems = [
    { id: 1, task: 'Review Smith contract', priority: 'high', due: 'Today' },
    { id: 2, task: 'Prepare court documents', priority: 'medium', due: 'Tomorrow' },
    { id: 3, task: 'Send follow-up email', priority: 'low', due: 'Mar 25' },
    { id: 4, task: 'Update client database', priority: 'medium', due: 'Mar 28' },
  ];

  const handleBookingAction = (id: string, action: string) => {
    console.log(`Booking ${id}: ${action}`);
    // API call placeholder
  };

  return (
    <DashboardLayout userType="lawyer">
      {/* Header with tabs */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah!</h1>
            <p className="text-gray-600">Here's your practice overview for today.</p>
          </div>
          <Link href="/dashboard/lawyer/availability">
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Set Availability
            </Button>
          </Link>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex space-x-1">
            {[
              { id: 'overview', label: 'Overview', icon: Briefcase },
              { id: 'bookings', label: 'Bookings', icon: Calendar },
              { id: 'earnings', label: 'Earnings', icon: DollarSign },
              { id: 'todo', label: 'To-Do', icon: FileText },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-600 hover:text-black'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content */}
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Bookings */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Bookings</CardTitle>
                <Link href="/dashboard/lawyer/bookings">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      {...booking}
                      onAction={handleBookingAction}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Earnings Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <EarningsChart />
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* To-Do List */}
            <Card>
              <CardHeader>
                <CardTitle>To-Do List</CardTitle>
              </CardHeader>
              <CardContent>
                <TodoList items={todoItems.slice(0, 3)} />
                <Link href="/dashboard/lawyer/todo">
                  <Button variant="outline" className="w-full mt-4">
                    View All Tasks
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold">John Anderson</h3>
                      <p className="text-gray-600 text-sm">Contract Review</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">2:00 PM</p>
                      <p className="text-gray-500 text-sm">1 hour</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Consultation</h3>
                      <p className="text-gray-600 text-sm">New Client</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">4:30 PM</p>
                      <p className="text-gray-500 text-sm">30 min</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Consultations</span>
                    <span className="font-semibold">18</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">New Clients</span>
                    <span className="font-semibold">6</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Earnings</span>
                    <span className="font-semibold">$3,450</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg. Rating</span>
                    <div className="flex items-center">
                      <span className="font-semibold mr-1">4.9</span>
                      <span className="text-yellow-500">★</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...bookings, ...bookings].map((booking, index) => (
                <BookingCard
                  key={index}
                  {...booking}
                  onAction={handleBookingAction}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Earnings Tab */}
      {activeTab === 'earnings' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Earnings Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <EarningsChart detailed />
            </CardContent>
          </Card>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-gray-600">Available Balance</p>
                  <p className="text-3xl font-bold mt-2">$4,250</p>
                  <Button className="w-full mt-4">Withdraw</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-gray-600">This Month</p>
                  <p className="text-3xl font-bold mt-2">$3,450</p>
                  <p className="text-green-600 text-sm mt-2">+12% from last month</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-gray-600">Total Earnings</p>
                  <p className="text-3xl font-bold mt-2">$12,450</p>
                  <p className="text-gray-500 text-sm mt-2">Since joining</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* To-Do Tab */}
      {activeTab === 'todo' && (
        <Card>
          <CardHeader>
            <CardTitle>Task Management</CardTitle>
          </CardHeader>
          <CardContent>
            <TodoList items={todoItems} />
            <div className="mt-6">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Add new task..."
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                />
                <Button>Add Task</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
}