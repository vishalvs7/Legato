'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function LawyerDocumentVaultPage() {
  return (
    <DashboardLayout userType="lawyer">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Document Vault</h1>
            <p className="text-gray-600">Secure document management for client files</p>
          </div>
          <Button>Upload Document</Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Document vault with file upload, categorization, and client sharing will be implemented here.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
