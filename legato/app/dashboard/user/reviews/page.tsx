'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { 
  Star, MessageSquare, ThumbsUp, Edit, 
  Trash2, Calendar, User, Clock 
} from 'lucide-react';

export default function ClientReviewsPage() {
  const [newReview, setNewReview] = useState({
    lawyerId: '',
    rating: 5,
    comment: '',
  });
  const [editingReview, setEditingReview] = useState<string | null>(null);

  const reviews = [
    {
      id: '1',
      lawyerName: 'Sarah Johnson',
      lawyerSpecialization: 'Corporate Law',
      date: 'Mar 18, 2024',
      rating: 5,
      comment: 'Sarah provided excellent guidance during our company acquisition. Her attention to detail saved us from potential pitfalls.',
      helpful: 3,
      lawyerResponse: 'Thank you for your kind words! It was a pleasure working with your team.',
    },
    {
      id: '2',
      lawyerName: 'Michael Chen',
      lawyerSpecialization: 'Intellectual Property',
      date: 'Mar 10, 2024',
      rating: 4,
      comment: 'Professional and knowledgeable. Helped us secure our software patents efficiently.',
      helpful: 1,
    },
    {
      id: '3',
      lawyerName: 'Maria Rodriguez',
      lawyerSpecialization: 'Family Law',
      date: 'Feb 28, 2024',
      rating: 5,
      comment: 'Compassionate and understanding during a difficult divorce process. Highly recommended!',
      helpful: 2,
    },
  ];

  const pendingReviews = [
    {
      id: 'p1',
      lawyerName: 'Robert Williams',
      service: 'Criminal Defense Consultation',
      date: 'Mar 20, 2024',
      expires: 'Apr 20, 2024',
    },
    {
      id: 'p2',
      lawyerName: 'Jennifer Park',
      service: 'Immigration Consultation',
      date: 'Mar 22, 2024',
      expires: 'Apr 22, 2024',
    },
  ];

  const handleSubmitReview = () => {
    if (!newReview.comment.trim()) return;
    
    console.log('Submitting review:', newReview);
    // API call placeholder
    setNewReview({ lawyerId: '', rating: 5, comment: '' });
  };

  const handleEditReview = (id: string) => {
    setEditingReview(id);
    // Load review data placeholder
  };

  const handleDeleteReview = (id: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      console.log('Deleting review:', id);
      // API call placeholder
    }
  };

  const handleHelpful = (id: string) => {
    console.log('Marked helpful:', id);
    // API call placeholder
  };

  return (
    <DashboardLayout userType="client">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Reviews</h1>
            <p className="text-gray-600">Share your experience with lawyers</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="success" className="text-sm">
              <Star className="h-3 w-3 mr-1 fill-current" />
              {reviews.length} Reviews Written
            </Badge>
          </div>
        </div>

        {/* Pending Reviews */}
        {pendingReviews.length > 0 && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-yellow-600" />
                Pending Reviews ({pendingReviews.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingReviews.map((review) => (
                  <div key={review.id} className="flex items-center justify-between p-4 bg-white border border-yellow-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{review.lawyerName}</h3>
                        <p className="text-gray-600 text-sm">{review.service}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center text-gray-500 text-sm">
                            <Calendar className="h-3 w-3 mr-1" />
                            {review.date}
                          </div>
                          <div className="flex items-center text-yellow-600 text-sm">
                            <Clock className="h-3 w-3 mr-1" />
                            Expires {review.expires}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Write Review
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Write New Review */}
        <Card>
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Lawyer
                </label>
                <select
                  value={newReview.lawyerId}
                  onChange={(e) => setNewReview({ ...newReview, lawyerId: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-black focus:outline-none"
                >
                  <option value="">Choose a lawyer...</option>
                  <option value="1">Sarah Johnson - Corporate Law</option>
                  <option value="2">Michael Chen - Intellectual Property</option>
                  <option value="3">Maria Rodriguez - Family Law</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="text-2xl"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= newReview.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <Textarea
                label="Your Review"
                placeholder="Share your experience with this lawyer..."
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                rows={4}
              />

              <div className="flex justify-end">
                <Button
                  onClick={handleSubmitReview}
                  disabled={!newReview.lawyerId || !newReview.comment.trim()}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Submit Review
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* My Reviews */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">My Reviews</h2>
            <div className="text-sm text-gray-600">
              {reviews.length} reviews • {reviews.reduce((acc, r) => acc + r.helpful, 0)} helpful votes
            </div>
          </div>

          <div className="space-y-6">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                        <div className="h-full w-full flex items-center justify-center">
                          <User className="h-6 w-6 text-gray-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold">{review.lawyerName}</h3>
                        <p className="text-gray-600 text-sm">{review.lawyerSpecialization}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center">
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
                          <div className="flex items-center text-gray-500 text-sm">
                            <Calendar className="h-3 w-3 mr-1" />
                            {review.date}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditReview(review.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <Edit className="h-4 w-4 text-gray-500" />
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{review.comment}</p>

                  {review.lawyerResponse && (
                    <div className="pl-4 border-l-2 border-gray-200 mb-4">
                      <div className="font-semibold text-sm mb-1">Response from {review.lawyerName}:</div>
                      <p className="text-gray-600 text-sm">{review.lawyerResponse}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleHelpful(review.id)}
                      className="flex items-center text-gray-600 hover:text-black"
                    >
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Helpful ({review.helpful})
                    </button>
                    <Badge variant="success">
                      Published
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Review Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>Review Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-black mt-2 mr-3"></div>
                <span>Share your genuine experience with the lawyer</span>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-black mt-2 mr-3"></div>
                <span>Focus on the lawyer's expertise, communication, and results</span>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-black mt-2 mr-3"></div>
                <span>Avoid sharing sensitive personal information</span>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-black mt-2 mr-3"></div>
                <span>Reviews must be submitted within 30 days of service</span>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-black mt-2 mr-3"></div>
                <span>Lawyers may respond to your review</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}