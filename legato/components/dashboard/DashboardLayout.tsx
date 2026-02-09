'use client';

import React, { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: 'client' | 'lawyer';
}

export default function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar 
        userType={userType} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className={cn(
        "transition-all duration-300",
        "lg:ml-64"
      )}>
        <DashboardHeader 
          userType={userType} 
          onMenuClick={() => setSidebarOpen(true)} 
        />
        
        <main className="p-4 md:p-6">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}