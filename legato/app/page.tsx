// FILE: page.tsx
// PATH: /legato/app/page.tsx
// PURPOSE: Landing page with hero, features, and call-to-action

import React from 'react';
import Link from 'next/link';
import { 
  Search, 
  Calendar, 
  Shield, 
  Users, 
  Clock, 
  DollarSign,
  CheckCircle,
  ArrowRight,
  Star,
  Award,
  Briefcase,
  FileText
} from 'lucide-react';

// Mock data for featured lawyers
const featuredLawyers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    specialization: 'Corporate Law',
    experience: 12,
    rating: 4.9,
    reviews: 128,
    rate: 250,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Michael Chen',
    specialization: 'Intellectual Property',
    experience: 8,
    rating: 4.8,
    reviews: 94,
    rate: 200,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'Maria Rodriguez',
    specialization: 'Family Law',
    experience: 15,
    rating: 4.9,
    reviews: 156,
    rate: 180,
    image: 'https://images.unsplash.com/photo-1551836026-d5c2c5af78e4?w-400&h=400&fit=crop',
  },
];

// Features data
const features = [
  {
    icon: Search,
    title: 'Find Expert Lawyers',
    description: 'Browse verified lawyers by specialization, experience, and client reviews.',
  },
  {
    icon: Calendar,
    title: 'Easy Booking',
    description: 'Book appointments instantly with lawyers\' available time slots.',
  },
  {
    icon: Shield,
    title: 'Secure Platform',
    description: 'End-to-end encrypted consultations and secure document sharing.',
  },
  {
    icon: Users,
    title: 'Client Community',
    description: 'Join thousands of satisfied clients who found legal help.',
  },
];

// How it works steps
const steps = [
  {
    number: '01',
    title: 'Sign Up',
    description: 'Create your free account as a client or lawyer.',
  },
  {
    number: '02',
    title: 'Find & Connect',
    description: 'Browse lawyers or get matched based on your needs.',
  },
  {
    number: '03',
    title: 'Book Consultation',
    description: 'Schedule a video consultation at your convenience.',
  },
  {
    number: '04',
    title: 'Get Legal Help',
    description: 'Connect with your lawyer and get the help you need.',
  },
];

// Stats data
const stats = [
  { value: '500+', label: 'Expert Lawyers' },
  { value: '10,000+', label: 'Happy Clients' },
  { value: '25,000+', label: 'Consultations' },
  { value: '98%', label: 'Satisfaction Rate' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-20 md:py-32">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Legal Consultation
                <span className="block text-gray-600">Made Simple</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                Connect with expert lawyers for virtual consultations. 
                Book appointments, share documents, and get legal advice—all in one secure platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/role-selector" 
                  className="btn-primary px-8 py-3 text-lg inline-flex items-center justify-center group"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/lawyers" 
                  className="btn-secondary px-8 py-3 text-lg inline-flex items-center justify-center"
                >
                  Browse Lawyers
                </Link>
              </div>
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 font-medium">4.9/5 from 2,500+ reviews</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-900 to-black" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white p-8 text-center">
                    <Briefcase className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Virtual Law Office</h3>
                    <p className="text-gray-300">Your legal matters, handled professionally online</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-black mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Legato?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We've built the most comprehensive platform for legal consultations
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-black flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Get legal help in four simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-black text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300 -translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Lawyers */}
      <section className="py-20">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Lawyers</h2>
              <p className="text-gray-600">Top-rated legal experts on our platform</p>
            </div>
            <Link href="/lawyers" className="btn-secondary inline-flex items-center">
              View All Lawyers
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredLawyers.map((lawyer) => (
              <div key={lawyer.id} className="card group hover:shadow-xl transition-all">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="h-20 w-20 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={lawyer.image}
                      alt={lawyer.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{lawyer.name}</h3>
                    <p className="text-gray-600 text-sm">{lawyer.specialization}</p>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-medium">{lawyer.rating}</span>
                        <span className="ml-1 text-gray-500">({lawyer.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">{lawyer.experience} years experience</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span className="font-semibold">${lawyer.rate}/hr</span>
                    </div>
                  </div>
                  <Link
                    href={`/lawyers/${lawyer.id}`}
                    className="btn-primary w-full py-2.5 text-sm inline-flex items-center justify-center group"
                  >
                    View Profile
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container-custom text-center">
          <Award className="h-16 w-16 mx-auto mb-6 text-gray-300" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Simplify Your Legal Journey?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
            Join thousands of clients and lawyers who trust Legato for their legal consultations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/role-selector" 
              className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg inline-flex items-center justify-center transition-colors"
            >
              Get Started Free
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold text-lg inline-flex items-center justify-center transition-colors"
            >
              Schedule a Demo
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-gray-400">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Free 30-minute trial consultation</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}