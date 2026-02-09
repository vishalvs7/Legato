'use client';

import React, { useState } from 'react';
import { Bell, Search, Menu, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  userType: 'client' | 'lawyer';
  onMenuClick: () => void;
}

export default function DashboardHeader({ userType, onMenuClick }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    { id: 1, title: 'New booking request', time: '10 min ago', read: false },
    { id: 2, title: 'Document uploaded', time: '1 hour ago', read: true },
    { id: 3, title: 'Payment received', time: '2 hours ago', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Mobile menu button & Search */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
              />
            </div>
          </div>

          {/* Right side - User menu & Notifications */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button className="relative p-2 rounded-lg hover:bg-gray-100">
                <Bell className="h-5 w-5 text-gray-700" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </button>
            </div>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                  {/* Placeholder avatar */}
                  <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600 font-medium">JD</span>
                  </div>
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium">John Doe</div>
                  <div className="text-xs text-gray-500 capitalize">{userType}</div>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-gray-500 transition-transform",
                  showUserMenu && "rotate-180"
                )} />
              </button>

              {/* Dropdown menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="text-sm font-medium">John Doe</div>
                    <div className="text-xs text-gray-500">john@example.com</div>
                  </div>
                  <div className="py-2">
                    <a
                      href={`/dashboard/${userType}/profile`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Profile
                    </a>
                    <a
                      href={`/dashboard/${userType}/settings`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                  </div>
                  <div className="border-t border-gray-100 pt-2">
                    <button 
                      onClick={() => {
                        document.cookie = 'legato-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                        document.cookie = 'legato-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                        window.location.href = '/auth/login';
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
            />
          </div>
        </div>
      </div>
    </header>
  );
}