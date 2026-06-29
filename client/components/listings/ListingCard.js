'use client';

// ============================================================
// LISTING CARD COMPONENT
// ============================================================
// Service listing card used on listings page and city detail pages.
// Shows image, title, category badge, city, rating, and price.
// ============================================================

import Link from 'next/link';
import StarRating from '@/components/ui/StarRating';

export default function ListingCard({ listing }) {
  // Category styling
  const categoryStyles = {
    housing: { bg: 'bg-blue-100 text-blue-700', icon: '🏠' },
    school: { bg: 'bg-violet-100 text-violet-700', icon: '🎓' },
    hospital: { bg: 'bg-emerald-100 text-emerald-700', icon: '🏥' },
  };

  const cat = categoryStyles[listing.category] || categoryStyles.housing;

  return (
    <Link href={`/listings/${listing._id}`} className="group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group-hover:border-blue-200 group-hover:-translate-y-1 h-full flex flex-col">
        {/* Listing Image */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cat.bg}`}>
              {cat.icon} {listing.category.charAt(0).toUpperCase() + listing.category.slice(1)}
            </span>
          </div>

          {/* Verified Badge */}
          {listing.verified && (
            <div className="absolute top-3 right-3">
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-emerald-500 text-white flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Verified
              </span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors mb-1 line-clamp-1">
            {listing.title}
          </h3>

          {/* Location */}
          <p className="text-xs text-slate-500 flex items-center gap-1 mb-2">
            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {listing.location || listing.city}
          </p>

          {/* Description */}
          <p className="text-sm text-slate-600 line-clamp-2 mb-3 flex-1">
            {listing.description}
          </p>

          {/* Bottom: Rating + Price */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="flex items-center gap-1">
              <StarRating rating={listing.rating} size="sm" />
              <span className="text-xs text-slate-400">({listing.reviewCount})</span>
            </div>
            {listing.price && (
              <span className="text-sm font-bold text-blue-600">{listing.price}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
