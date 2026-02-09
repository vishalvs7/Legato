// FILE: page.tsx
// PATH: /legato/app/contact/page.tsx

'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      details: 'support@legato.com',
      description: 'We respond within 24 hours',
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri, 9am-6pm EST',
    },
    {
      icon: MapPin,
      title: 'Office',
      details: '123 Legal Street, Suite 100',
      subdetails: 'San Francisco, CA 94107',
      description: 'By appointment only',
    },
  ];

  const faqs = [
    {
      question: 'How do I become a lawyer on Legato?',
      answer: 'Click "Get Started" and select "I\'m a Lawyer" to begin the verification process.',
    },
    {
      question: 'What types of legal issues can I get help with?',
      answer: 'Our lawyers cover various specialties including family law, business law, real estate, immigration, and more.',
    },
    {
      question: 'Is my consultation confidential?',
      answer: 'Yes, all consultations are encrypted and confidential, protected by attorney-client privilege.',
    },
    {
      question: 'How are lawyers verified on Legato?',
      answer: 'All lawyers undergo rigorous verification including bar license checks and background screening.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-600">
              Have questions? We're here to help. Reach out to our team for support, 
              partnership inquiries, or feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {contactMethods.map((method, index) => (
              <div key={index} className="card text-center hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-black flex items-center justify-center mx-auto mb-6">
                  <method.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                <p className="text-gray-900 font-medium mb-1">{method.details}</p>
                {method.subdetails && (
                  <p className="text-gray-900 font-medium mb-2">{method.subdetails}</p>
                )}
                <p className="text-gray-600 text-sm">{method.description}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>
              
              {isSubmitted ? (
                <div className="card bg-green-50 border-green-200">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-green-900">Message Sent!</h3>
                      <p className="text-green-700">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="feedback">Feedback/Suggestions</option>
                      <option value="legal">Legal Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="input resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-3 text-lg inline-flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* FAQ & Info */}
            <div>
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Clock className="h-6 w-6 mr-3" />
                  Response Time
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-600">Email Support</span>
                    <span className="font-semibold">Within 24 hours</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-600">Urgent Issues</span>
                    <span className="font-semibold">Within 4 hours</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-600">Business Hours</span>
                    <span className="font-semibold">Mon-Fri, 9AM-6PM EST</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b pb-6 last:border-0 last:pb-0">
                      <h4 className="font-semibold text-lg mb-2">{faq.question}</h4>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-lg mb-3">Need Immediate Legal Help?</h4>
                <p className="text-gray-600 mb-4">
                  If you require urgent legal assistance, please browse our lawyer directory 
                  to find and book an immediate consultation.
                </p>
                <a 
                  href="/lawyers" 
                  className="btn-primary inline-flex items-center"
                >
                  Browse Lawyers
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <div className="h-96 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
              <div className="text-white text-center">
                <MapPin className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">San Francisco Office</h3>
                <p className="text-gray-300">123 Legal Street, Suite 100</p>
                <p className="text-gray-300">San Francisco, CA 94107</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}