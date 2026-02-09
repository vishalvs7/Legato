'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ClientSettingsPage() {
  return (
    <DashboardLayout userType="client">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-gray-600">Account preferences and security settings</p>
          </div>
          <Button>Save Changes</Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Account settings, notifications, and security preferences will be implemented here.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
