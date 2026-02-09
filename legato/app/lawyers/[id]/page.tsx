// FILE: page.tsx
// PATH: /legato/app/lawyers/[id]/page.tsx

'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Star, MapPin, Briefcase, Clock, DollarSign, Award, 
  Calendar, MessageSquare, FileText, Globe, CheckCircle,
  ChevronLeft, Share2, Bookmark
} from 'lucide-react';

// Mock data for a single lawyer
const lawyerData = {
  id: '1',
  name: 'Sarah Johnson',
  title: 'Senior Corporate Attorney',
  specialization: ['Corporate Law', 'Business Law', 'M&A'],
  experience: 12,
  rating: 4.9,
  reviews: 128,
  hourlyRate: 250,
  location: 'New York, NY',
  languages: ['English', 'Spanish'],
  verified: true,
  bio: 'Corporate attorney with 12+ years of experience specializing in mergers and acquisitions, business formation, and corporate governance. Former general counsel at a Fortune 500 company.',
  education: [
    { degree: 'J.D.', school: 'Harvard Law School', year: 2011 },
    { degree: 'B.A. Economics', school: 'Stanford University', year: 2008 },
  ],
  certifications: [
    'New York State Bar',
    'Certified Mergers & Acquisitions Professional',
  ],
  availability: ['Mon-Fri: 9 AM - 6 PM EST', 'Weekends: By appointment'],
  nextAvailable: 'Tomorrow at 2:00 PM',
  
  // Detailed sections
  about: `With over 12 years of experience in corporate law, Sarah has successfully guided numerous businesses through complex legal landscapes. Her expertise includes mergers and acquisitions, corporate restructuring, contract negotiation, and regulatory compliance.

Sarah takes a strategic approach to legal counsel, ensuring that her clients not only remain compliant but also gain competitive advantages through smart legal planning. She has worked with startups, mid-sized companies, and Fortune 500 corporations across various industries.`,
  
  services: [
    'Business Formation & Structuring',
    'Mergers & Acquisitions',
    'Contract Drafting & Review',
    'Corporate Governance',
    'Regulatory Compliance',
    'Intellectual Property Protection',
    'Employment Law',
    'Risk Management',
  ],
  
  reviewsList: [
    {
      id: 1,
      client: 'John D.',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Sarah provided excellent guidance during our company acquisition. Her attention to detail saved us from potential pitfalls.',
      response: 'Thank you, John! It was a pleasure working with your team.',
    },
    {
      id: 2,
      client: 'Maria S.',
      rating: 5,
      date: '1 month ago',
      comment: 'Professional, knowledgeable, and responsive. Highly recommend for any corporate legal needs.',
    },
    {
      id: 3,
      client: 'Robert K.',
      rating: 4,
      date: '2 months ago',
      comment: 'Great experience overall. Sarah helped us navigate complex contract negotiations successfully.',
    },
  ],
  
  image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=600&fit=crop',
};

export default function LawyerProfilePage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock - would fetch lawyer data based on ID
  const lawyer = lawyerData;

  return (
    <div className="min-h-screen">
      {/* Back Navigation */}
      <div className="border-b">
        <div className="container-custom py-4">
          <Link href="/lawyers" className="inline-flex items-center text-gray-600 hover:text-black">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Lawyers
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-8 md:py-12">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Profile */}
            <div className="lg:col-span-2">
              <div className="flex flex-col md:flex-row md:items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="h-48 w-48 rounded-2xl overflow-hidden">
                    <img
                      src={lawyer.image}
                      alt={lawyer.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-3xl font-bold">{lawyer.name}</h1>
                        {lawyer.verified && (
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="h-5 w-5" />
                            <span className="text-sm font-medium">Verified</span>
                          </div>
                        )}
                      </div>
                      <p className="text-xl text-gray-600 mb-4">{lawyer.title}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {lawyer.specialization.map((spec) => (
                          <span
                            key={spec}
                            className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg border hover:bg-gray-50">
                        <Share2 className="h-5 w-5" />
                      </button>
                      <button className="p-2 rounded-lg border hover:bg-gray-50">
                        <Bookmark className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold flex items-center justify-center gap-1">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        {lawyer.rating}
                      </div>
                      <div className="text-gray-600 text-sm">{lawyer.reviews} reviews</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold">{lawyer.experience}</div>
                      <div className="text-gray-600 text-sm">Years experience</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold">${lawyer.hourlyRate}</div>
                      <div className="text-gray-600 text-sm">Per hour</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold">{lawyer.languages.length}</div>
                      <div className="text-gray-600 text-sm">Languages</div>
                    </div>
                  </div>
                  
                  {/* Quick Info */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <span>{lawyer.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-gray-400" />
                      <span>{lawyer.languages.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span>Next available: <strong>{lawyer.nextAvailable}</strong></span>
                    </div>
                  </div>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href={`/lawyers/${lawyer.id}/booking`}
                      className="btn-primary py-3 px-8 text-lg"
                    >
                      Book Consultation
                    </Link>
                    <button className="btn-secondary py-3 px-8 text-lg">
                      <MessageSquare className="h-5 w-5 mr-2 inline" />
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                <h3 className="text-xl font-bold mb-6">Schedule Consultation</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hourly Rate</span>
                    <span className="font-bold">${lawyer.hourlyRate}/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Minimum Duration</span>
                    <span className="font-bold">1 hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-bold">Within 4 hours</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Availability</h4>
                  <ul className="space-y-2">
                    {lawyer.availability.map((time, index) => (
                      <li key={index} className="text-gray-600 text-sm">{time}</li>
                    ))}
                  </ul>
                </div>
                
                <Link
                  href={`/lawyers/${lawyer.id}/booking`}
                  className="btn-primary w-full py-3 text-lg"
                >
                  Select Time Slot
                </Link>
                
                <p className="text-center text-gray-500 text-sm mt-4">
                  Cancel anytime • Secure payment • 24/7 support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="border-b">
        <div className="container-custom">
          <div className="flex overflow-x-auto">
            {['overview', 'services', 'reviews', 'education'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-600 hover:text-black'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <section className="py-12">
        <div className="container-custom">
          {activeTab === 'overview' && (
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold mb-6">About {lawyer.name}</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed mb-8">{lawyer.about}</p>
                
                <h3 className="text-xl font-bold mb-4">Certifications</h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {lawyer.certifications.map((cert, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-bold mb-4">Education</h3>
                <div className="space-y-4">
                  {lawyer.education.map((edu, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b last:border-0">
                      <div>
                        <div className="font-semibold">{edu.degree}</div>
                        <div className="text-gray-600">{edu.school}</div>
                      </div>
                      <div className="text-gray-500">{edu.year}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'services' && (
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold mb-6">Services Offered</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {lawyer.services.map((service, index) => (
                  <div key={index} className="card">
                    <div className="flex items-start">
                      <FileText className="h-5 w-5 text-gray-400 mt-1 mr-3" />
                      <div>
                        <h3 className="font-semibold mb-2">{service}</h3>
                        <p className="text-gray-600 text-sm">
                          Expert guidance and legal support for {service.toLowerCase()}.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="max-w-3xl">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold">Client Reviews</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-xl font-bold">{lawyer.rating}</span>
                    </div>
                    <span className="text-gray-600">({lawyer.reviews} reviews)</span>
                  </div>
                </div>
                <button className="btn-primary">Write a Review</button>
              </div>
              
              <div className="space-y-8">
                {lawyer.reviewsList.map((review) => (
                  <div key={review.id} className="card">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-semibold">{review.client}</div>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-gray-500 text-sm">{review.date}</div>
                    </div>
                    <p className="text-gray-600 mb-4">{review.comment}</p>
                    {review.response && (
                      <div className="pl-4 border-l-2 border-gray-200">
                        <div className="font-semibold text-sm mb-1">Response from {lawyer.name}:</div>
                        <p className="text-gray-600 text-sm">{review.response}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}