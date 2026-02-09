'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, User, Calendar, FileText, 
  Star, CreditCard, Settings, LogOut, X,
  Briefcase, DollarSign, CheckCircle, Folder,
  Clock, MessageSquare, Users, BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  userType: 'client' | 'lawyer';
  isOpen: boolean;
  onClose: () => void;
}

export default function DashboardSidebar({ userType, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Client navigation items
  const clientNavItems = [
    { name: 'Dashboard', href: '/dashboard/user', icon: LayoutDashboard },
    { name: 'My Profile', href: '/dashboard/user/profile', icon: User },
    { name: 'My Bookings', href: '/dashboard/user/bookings', icon: Calendar },
    { name: 'Documents', href: '/dashboard/user/documents', icon: FileText },
    { name: 'Reviews', href: '/dashboard/user/reviews', icon: Star },
    { name: 'Billing', href: '/dashboard/user/billing', icon: CreditCard },
  ];

  // Lawyer navigation items
  const lawyerNavItems = [
    { name: 'Dashboard', href: '/dashboard/lawyer', icon: LayoutDashboard },
    { name: 'Profile', href: '/dashboard/lawyer/profile', icon: User },
    { name: 'Bookings', href: '/dashboard/lawyer/bookings', icon: Calendar },
    { name: 'Earnings', href: '/dashboard/lawyer/earnings', icon: DollarSign },
    { name: 'To-Do List', href: '/dashboard/lawyer/todo', icon: CheckCircle },
    { name: 'Document Vault', href: '/dashboard/lawyer/vault', icon: Folder },
    { name: 'Availability', href: '/dashboard/lawyer/availability', icon: Clock },
    { name: 'Clients', href: '/dashboard/lawyer/clients', icon: Users },
  ];

  const navItems = userType === 'client' ? clientNavItems : lawyerNavItems;

  const handleLogout = () => {
    // Clear cookies and redirect to login
    document.cookie = 'legato-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'legato-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/auth/login');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out",
        "flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0 lg:static lg:inset-auto"
      )}>
        {/* Logo & Close button */}
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2" onClick={onClose}>
            <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <span className="font-bold text-xl">Legato</span>
            <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
              {userType === 'lawyer' ? 'Lawyer' : 'Client'}
            </span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-black"
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Settings & Logout */}
          <div className="mt-8 pt-6 border-t border-gray-200 space-y-1">
            <Link
              href={`/dashboard/${userType}/settings`}
              onClick={onClose}
              className="flex items-center px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-black"
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-black"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </button>
          </div>
        </nav>

        {/* User info */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
              {/* Placeholder avatar */}
              <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                <User className="h-6 w-6 text-gray-600" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-500 capitalize">{userType}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}