'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { BookingCard } from '@/components/dashboard/BookingCard';
import { 
  Calendar, Filter, Download, Clock, 
  CheckCircle, XCircle, MoreVertical 
} from 'lucide-react';

export default function ClientBookingsPage() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

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
    {
      id: '4',
      clientName: 'Robert Williams',
      service: 'Intellectual Property',
      date: 'Mar 15, 2024',
      time: '11:00 AM - 12:00 PM',
      duration: '1 hour',
      status: 'completed' as const,
      amount: 200,
      location: 'Video Call',
    },
    {
      id: '5',
      clientName: 'Jennifer Park',
      service: 'Immigration Consultation',
      date: 'Mar 25, 2024',
      time: '1:00 PM - 2:00 PM',
      duration: '1 hour',
      status: 'confirmed' as const,
      amount: 175,
      location: 'Video Call',
    },
    {
      id: '6',
      clientName: 'David Miller',
      service: 'Real Estate Consultation',
      date: 'Mar 10, 2024',
      time: '3:00 PM - 4:00 PM',
      duration: '1 hour',
      status: 'cancelled' as const,
      amount: 220,
      location: 'Video Call',
    },
  ];

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const handleBookingAction = (id: string, action: string) => {
    console.log(`Booking ${id}: ${action}`);
    // API call placeholder
    alert(`${action} booking ${id}`);
  };

  const stats = [
    { label: 'Total Bookings', value: '12', icon: Calendar },
    { label: 'Upcoming', value: '3', icon: Clock },
    { label: 'Completed', value: '7', icon: CheckCircle },
    { label: 'Cancelled', value: '2', icon: XCircle },
  ];

  return (
    <DashboardLayout userType="client">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Bookings</h1>
            <p className="text-gray-600">Manage all your legal consultations</p>
          </div>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            New Booking
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-black flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm font-medium">Filters:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['all', 'confirmed', 'pending', 'completed', 'cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilter(status)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize ${
                        filter === status
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  options={[
                    { value: 'date', label: 'Sort by: Date' },
                    { value: 'amount', label: 'Sort by: Amount' },
                    { value: 'status', label: 'Sort by: Status' },
                  ]}
                  className="w-40"
                />
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No bookings found</h3>
                <p className="text-gray-600 mb-6">Try changing your filters or book a new consultation</p>
                <Button>Browse Lawyers</Button>
              </CardContent>
            </Card>
          ) : (
            filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                {...booking}
                onAction={handleBookingAction}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {filteredBookings.length > 0 && (
          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-sm">
              Showing {filteredBookings.length} of {bookings.length} bookings
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-black text-white">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}