// FILE: Navbar.tsx
// PATH: /legato/components/marketing/Navbar.tsx
// PURPOSE: Main navigation bar with auth state awareness

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuthContext } from '@/context/AuthContext';
import { Menu, X, User, Briefcase, LogOut } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userProfile, isAuthenticated, signOut } = useAuthContext();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Lawyers', href: '/lawyers' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold text-black">Legato</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-black transition-colors font-medium text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    {userProfile?.role === 'lawyer' ? (
                      <Briefcase className="h-4 w-4 text-gray-600" />
                    ) : (
                      <User className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">
                      {userProfile?.displayName}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">
                      {userProfile?.role}
                    </span>
                  </div>
                </div>
                <Link
                  href={userProfile?.role === 'lawyer' ? '/dashboard' : '/dashboard/profile'}
                  className="btn-primary px-4 py-2 text-sm"
                >
                  Dashboard
                </Link>
                <button
                  onClick={signOut}
                  className="flex items-center space-x-1 text-gray-600 hover:text-black transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-black transition-colors font-medium text-sm"
                >
                  Login
                </Link>
                <Link
                  href="/role-selector"
                  className="btn-primary px-6 py-2 text-sm"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-black transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <>
                  <Link
                    href={userProfile?.role === 'lawyer' ? '/dashboard' : '/dashboard/profile'}
                    className="text-gray-700 hover:text-black transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-gray-700 hover:text-black transition-colors font-medium py-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-gray-700 hover:text-black transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/role-selector"
                    className="btn-primary py-2 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}