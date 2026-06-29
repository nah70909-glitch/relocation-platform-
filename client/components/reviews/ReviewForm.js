'use client';

// ============================================================
// REVIEW FORM COMPONENT
// ============================================================
// Form to submit a new review with star rating and comment.
// Requires authentication.
// ============================================================

import { useState } from 'react';
import StarRating from '@/components/ui/StarRating';
import { useAuth } from '@/context/AuthContext';
import { reviewService } from '@/services/reviewService';

export default function ReviewForm({ listingId, onReviewAdded }) {
  const { isAuthenticated, user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    if (!comment.trim()) {
      setError('Please write a comment');
      return;
    }

    setLoading(true);
    try {
      const response = await reviewService.createReview({
        listingId,
        rating,
        comment: comment.trim(),
      });

      if (response.success) {
        setSuccess('Review added successfully!');
        setRating(0);
        setComment('');
        // Notify parent to refresh reviews
        if (onReviewAdded) onReviewAdded(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 text-center">
        <p className="text-slate-600 mb-2">Please log in to write a review</p>
        <a href="/login" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Log In →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-50 rounded-xl border border-slate-200 p-6">
      <h3 className="font-semibold text-slate-800 mb-4">Write a Review</h3>

      {/* Rating selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">Your Rating</label>
        <StarRating rating={rating} size="lg" interactive onChange={setRating} />
      </div>

      {/* Comment textarea */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">Your Review</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          rows={3}
          maxLength={500}
          className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all text-slate-800 placeholder-slate-400"
        />
        <p className="text-xs text-slate-400 mt-1">{comment.length}/500 characters</p>
      </div>

      {/* Error/Success messages */}
      {error && (
        <div className="mb-3 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-3 p-3 bg-emerald-50 text-emerald-600 text-sm rounded-lg border border-emerald-100">
          {success}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all shadow-md shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
