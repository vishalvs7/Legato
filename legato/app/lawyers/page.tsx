// FILE: page.tsx
// PATH: /legato/app/lawyers/page.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Star, MapPin, Briefcase, DollarSign, Clock, CheckCircle } from 'lucide-react';

// Mock lawyers data
const mockLawyers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    specialization: ['Corporate Law', 'Business Law'],
    experience: 12,
    rating: 4.9,
    reviews: 128,
    hourlyRate: 250,
    location: 'New York, NY',
    languages: ['English', 'Spanish'],
    verified: true,
    bio: 'Corporate attorney with 12+ years of experience in M&A and business formation.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'Michael Chen',
    specialization: ['Intellectual Property', 'Patent Law'],
    experience: 8,
    rating: 4.8,
    reviews: 94,
    hourlyRate: 200,
    location: 'San Francisco, CA',
    languages: ['English', 'Mandarin'],
    verified: true,
    bio: 'IP attorney specializing in tech patents and trademark protection.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    specialization: ['Family Law', 'Divorce'],
    experience: 15,
    rating: 4.9,
    reviews: 156,
    hourlyRate: 180,
    location: 'Miami, FL',
    languages: ['English', 'Spanish'],
    verified: true,
    bio: 'Family law specialist with compassionate approach to difficult situations.',
    image: 'https://images.unsplash.com/photo-1551836026-d5c2c5af78e4?w=400&h=400&fit=crop',
  },
  {
    id: '4',
    name: 'Robert Williams',
    specialization: ['Criminal Defense'],
    experience: 20,
    rating: 4.7,
    reviews: 203,
    hourlyRate: 300,
    location: 'Chicago, IL',
    languages: ['English'],
    verified: true,
    bio: 'Former prosecutor turned defense attorney with extensive trial experience.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    id: '5',
    name: 'Jennifer Park',
    specialization: ['Immigration Law'],
    experience: 7,
    rating: 4.8,
    reviews: 87,
    hourlyRate: 175,
    location: 'Los Angeles, CA',
    languages: ['English', 'Korean', 'Spanish'],
    verified: true,
    bio: 'Immigration attorney helping families and professionals achieve their American dream.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop',
  },
  {
    id: '6',
    name: 'David Miller',
    specialization: ['Real Estate', 'Property Law'],
    experience: 10,
    rating: 4.6,
    reviews: 112,
    hourlyRate: 220,
    location: 'Austin, TX',
    languages: ['English'],
    verified: true,
    bio: 'Real estate attorney specializing in commercial transactions and property disputes.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  },
];

const specializations = [
  'All Specializations',
  'Corporate Law',
  'Business Law',
  'Intellectual Property',
  'Patent Law',
  'Family Law',
  'Divorce',
  'Criminal Defense',
  'Immigration Law',
  'Real Estate',
  'Property Law',
  'Employment Law',
  'Tax Law',
  'Estate Planning',
];

const locations = [
  'All Locations',
  'New York, NY',
  'San Francisco, CA',
  'Miami, FL',
  'Chicago, IL',
  'Los Angeles, CA',
  'Austin, TX',
  'Boston, MA',
  'Seattle, WA',
];

export default function LawyersMarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All Specializations');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [minRate, setMinRate] = useState(0);
  const [maxRate, setMaxRate] = useState(500);
  const [showFilters, setShowFilters] = useState(false);

  // Filter lawyers
  const filteredLawyers = mockLawyers.filter((lawyer) => {
    const matchesSearch = searchQuery === '' || 
      lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.specialization.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase())) ||
      lawyer.bio.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialization = selectedSpecialization === 'All Specializations' || 
      lawyer.specialization.includes(selectedSpecialization);
    
    const matchesLocation = selectedLocation === 'All Locations' || 
      lawyer.location === selectedLocation;
    
    const matchesRate = lawyer.hourlyRate >= minRate && lawyer.hourlyRate <= maxRate;
    
    return matchesSearch && matchesSpecialization && matchesLocation && matchesRate;
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-12 md:py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Expert Lawyers</h1>
            <p className="text-xl text-gray-600 mb-10">
              Connect with verified legal professionals across various specialties
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search lawyers by name, specialization, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black focus:outline-none"
                />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 text-gray-600 hover:text-black"
                >
                  <Filter className="h-4 w-4" />
                  <span className="text-sm">Filters</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-black">{mockLawyers.length}+</div>
                <div className="text-gray-600">Verified Lawyers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-black">50+</div>
                <div className="text-gray-600">Specializations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-black">4.8</div>
                <div className="text-gray-600">Avg. Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      {showFilters && (
        <section className="bg-white border-b py-6">
          <div className="container-custom">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialization
                </label>
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="input"
                >
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="input"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hourly Rate: ${minRate} - ${maxRate}
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={minRate}
                    onChange={(e) => setMinRate(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>$0</span>
                    <span>$250</span>
                    <span>$500+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Lawyers Grid */}
      <section className="py-12">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              Available Lawyers {filteredLawyers.length > 0 && `(${filteredLawyers.length})`}
            </h2>
            <div className="text-gray-600">
              Sort by: <select className="border-none bg-transparent focus:outline-none">
                <option>Recommended</option>
                <option>Highest Rated</option>
                <option>Most Experienced</option>
                <option>Lowest Rate</option>
              </select>
            </div>
          </div>

          {filteredLawyers.length === 0 ? (
            <div className="text-center py-20">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">No lawyers found</h3>
              <p className="text-gray-600">Try adjusting your search filters</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLawyers.map((lawyer) => (
                <div key={lawyer.id} className="card group hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={lawyer.image}
                          alt={lawyer.name}
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-lg">{lawyer.name}</h3>
                          {lawyer.verified && (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{lawyer.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-black">${lawyer.hourlyRate}</div>
                      <div className="text-gray-500 text-sm">per hour</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {lawyer.specialization.map((spec) => (
                        <span
                          key={spec}
                          className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">{lawyer.bio}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-medium">{lawyer.rating}</span>
                          <span className="text-gray-500 ml-1">({lawyer.reviews})</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <span>{lawyer.experience} years</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 text-gray-400 mr-1" />
                        <span>{lawyer.languages.length} languages</span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Link
                        href={`/lawyers/${lawyer.id}`}
                        className="btn-primary flex-1 py-2.5 text-center"
                      >
                        View Profile
                      </Link>
                      <Link
                        href={`/lawyers/${lawyer.id}/booking`}
                        className="btn-secondary flex-1 py-2.5 text-center"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Are You a Lawyer?</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
            Join our platform and grow your practice with qualified clients.
          </p>
          <Link
            href="/auth/register/lawyer"
            className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg inline-flex items-center justify-center transition-colors"
          >
            Join as a Lawyer
          </Link>
        </div>
      </section>
    </div>
  );
}