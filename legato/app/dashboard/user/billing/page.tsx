'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ClientBillingPage() {
  return (
    <DashboardLayout userType="client">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Billing & Payments</h1>
            <p className="text-gray-600">Manage your invoices and payment methods</p>
          </div>
          <Button>Add Payment Method</Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Billing history, invoices, and payment management will be implemented here.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
