// FILE: page.tsx
// PATH: /legato/app/about/page.tsx

import React from 'react';
import { Target, Users, Shield, Globe, Heart, Award } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To democratize legal access by connecting people with qualified legal professionals through technology.',
    },
    {
      icon: Users,
      title: 'Our Team',
      description: 'A diverse group of legal experts, technologists, and designers committed to improving legal services.',
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'End-to-end encryption, secure payments, and strict verification processes for all professionals.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving clients and lawyers across multiple jurisdictions with localized legal expertise.',
    },
    {
      icon: Heart,
      title: 'Accessibility',
      description: 'Making legal services affordable and accessible to everyone, regardless of location or background.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Maintaining the highest standards of professionalism and service quality for our community.',
    },
  ];

  const milestones = [
    { year: '2023', event: 'Legato founded with vision to transform legal consultations' },
    { year: '2024', event: 'Launched MVP with 100+ lawyers and 1,000+ clients' },
    { year: '2024', event: 'Reached 10,000+ consultations milestone' },
    { year: '2025', event: 'Expanded to international markets' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Transforming Legal Access Through Technology</h1>
            <p className="text-xl text-gray-600 mb-10">
              Legato is more than a platform—it's a movement to make legal services accessible, 
              affordable, and efficient for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8">Our Story</h2>
              <div className="space-y-6 text-gray-600">
                <p>
                  Founded in 2023, Legato emerged from a simple observation: accessing quality 
                  legal help was often complicated, expensive, and intimidating for most people.
                </p>
                <p>
                  Our founders—a team of lawyers, technologists, and designers—set out to create 
                  a platform that bridges the gap between legal professionals and those who need 
                  their expertise.
                </p>
                <p>
                  Today, Legato connects thousands of clients with verified lawyers across 
                  multiple practice areas, making legal consultations as easy as clicking a button.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 text-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-6">By the Numbers</h3>
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">500+</div>
                    <div className="text-gray-300">Verified Lawyers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">98%</div>
                    <div className="text-gray-300">Satisfaction Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">25k+</div>
                    <div className="text-gray-300">Consultations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">10+</div>
                    <div className="text-gray-300">Countries Served</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Legato
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-black flex items-center justify-center mb-6">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start mb-12 last:mb-0">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-black text-white flex items-center justify-center font-bold">
                    {milestone.year}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="h-12 w-0.5 bg-gray-300 mx-auto mt-2"></div>
                  )}
                </div>
                <div className="ml-6 pt-2">
                  <p className="text-lg">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Legal Revolution
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
            Whether you're seeking legal help or looking to grow your practice, 
            Legato is the platform for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/role-selector" 
              className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg inline-flex items-center justify-center transition-colors"
            >
              Get Started
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold text-lg inline-flex items-center justify-center transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}