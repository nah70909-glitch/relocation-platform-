'use client';

// ============================================================
// LISTING DETAIL CLIENT COMPONENT
// ============================================================
// Handles interactive logic for the listing details.
// ============================================================

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { listings } from '@/data/seedData';
import StarRating from '@/components/ui/StarRating';
import ReviewCard from '@/components/reviews/ReviewCard';
import ReviewForm from '@/components/reviews/ReviewForm';
import { reviewService } from '@/services/reviewService';

export default function ListingDetailClient({ id }) {
  const listing = listings.find(l => l._id === id);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await reviewService.getReviews(id);
        if (response.success) {
          setReviews(response.data);
        }
      } catch {
        setReviews([]);
      } finally {
        setLoadingReviews(false);
      }
    };
    fetchReviews();
  }, [id]);

  const handleReviewAdded = (newReview) => {
    setReviews(prev => [newReview, ...prev]);
  };

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Listing Not Found</h2>
          <Link href="/listings" className="text-blue-600 hover:underline">← Back to Listings</Link>
        </div>
      </div>
    );
  }

  const categoryLabels = { housing: '🏠 Housing', school: '🎓 School', hospital: '🏥 Hospital' };

  return (
    <div className="animate-fadeIn">
      {/* Hero Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/listings" className="text-sm text-white/70 hover:text-white mb-2 inline-flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
              All Listings
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-white">{listing.title}</h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-sm text-white/90 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                {categoryLabels[listing.category]}
              </span>
              {listing.verified && (
                <span className="text-sm text-white bg-emerald-500/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  Verified
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-3">About</h2>
              <p className="text-slate-600 leading-relaxed">{listing.description}</p>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Reviews {reviews.length > 0 && `(${reviews.length})`}
              </h2>

              {/* Review Form */}
              <div className="mb-6">
                <ReviewForm listingId={id} onReviewAdded={handleReviewAdded} />
              </div>

              {/* Reviews List */}
              {loadingReviews ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2" />
                  <p className="text-sm text-slate-500">Loading reviews...</p>
                </div>
              ) : reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <p>No reviews yet. Be the first to review!</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm sticky top-20">
              {/* Price */}
              {listing.price && (
                <div className="mb-4 pb-4 border-b border-slate-100">
                  <p className="text-sm text-slate-500">Price</p>
                  <p className="text-2xl font-bold text-blue-600">{listing.price}</p>
                </div>
              )}

              {/* Rating */}
              <div className="mb-4 pb-4 border-b border-slate-100">
                <p className="text-sm text-slate-500 mb-1">Rating</p>
                <div className="flex items-center gap-2">
                  <StarRating rating={listing.rating} size="md" />
                  <span className="text-sm text-slate-500">({listing.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Location */}
              <div className="mb-4 pb-4 border-b border-slate-100">
                <p className="text-sm text-slate-500 mb-1">Location</p>
                <p className="text-sm font-medium text-slate-800 flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  {listing.location || listing.city}
                </p>
              </div>

              {/* Contact */}
              <div>
                <p className="text-sm text-slate-500 mb-2">Contact</p>
                <div className="space-y-2">
                  {listing.contact?.phone && (
                    <p className="text-sm text-slate-700 flex items-center gap-2">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                      {listing.contact.phone}
                    </p>
                  )}
                  {listing.contact?.email && (
                    <p className="text-sm text-slate-700 flex items-center gap-2">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                      {listing.contact.email}
                    </p>
                  )}
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-violet-600 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-violet-700 transition-all shadow-md">
                Contact Provider
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
