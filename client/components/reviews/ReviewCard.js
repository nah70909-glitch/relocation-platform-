'use client';

// ============================================================
// REVIEW CARD COMPONENT
// ============================================================
// Displays a single review with user info, rating, and comment.
// ============================================================

import StarRating from '@/components/ui/StarRating';

export default function ReviewCard({ review }) {
  // Format date to readable string
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-100 p-5 hover:border-slate-200 transition-colors">
      <div className="flex items-start justify-between mb-3">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-bold">
              {review.userName?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <div>
            <h4 className="font-medium text-slate-800 text-sm">{review.userName}</h4>
            <p className="text-xs text-slate-400">{formatDate(review.createdAt)}</p>
          </div>
        </div>

        {/* Rating */}
        <StarRating rating={review.rating} size="sm" />
      </div>

      {/* Comment */}
      <p className="text-sm text-slate-600 leading-relaxed">{review.comment}</p>
    </div>
  );
}
