'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function LawyerAvailabilityPage() {
  return (
    <DashboardLayout userType="lawyer">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Availability</h1>
            <p className="text-gray-600">Manage your appointment schedule and availability</p>
          </div>
          <Button>Set Schedule</Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Calendar integration and availability management will be implemented here.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
