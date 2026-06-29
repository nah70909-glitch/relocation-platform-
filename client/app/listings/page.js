'use client';

// ============================================================
// LISTINGS PAGE — /listings
// ============================================================
// Browse all service listings with filter sidebar.
// Supports: search, city filter, category filter, rating filter, sort.
// ============================================================

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ListingCard from '@/components/listings/ListingCard';
import FilterPanel from '@/components/listings/FilterPanel';
import { listings as allListings } from '@/data/seedData';

function ListingsContent() {
  const searchParams = useSearchParams();
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Initialize filters from URL params
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    city: searchParams.get('city') || '',
    category: searchParams.get('category') || '',
    rating: searchParams.get('rating') || '',
    sort: searchParams.get('sort') || '',
  });

  // Update filters when URL params change
  useEffect(() => {
    setFilters({
      search: searchParams.get('search') || '',
      city: searchParams.get('city') || '',
      category: searchParams.get('category') || '',
      rating: searchParams.get('rating') || '',
      sort: searchParams.get('sort') || '',
    });
  }, [searchParams]);

  // Apply filters to listings
  const filteredListings = allListings.filter(listing => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!listing.title.toLowerCase().includes(q) &&
          !listing.description.toLowerCase().includes(q) &&
          !listing.location.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (filters.city && listing.city.toLowerCase() !== filters.city.toLowerCase()) return false;
    if (filters.category && listing.category !== filters.category) return false;
    if (filters.rating && listing.rating < parseFloat(filters.rating)) return false;
    return true;
  }).sort((a, b) => {
    switch (filters.sort) {
      case 'rating': return b.rating - a.rating;
      case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
      case 'name': return a.title.localeCompare(b.title);
      default: return 0;
    }
  });

  const clearFilters = () => {
    setFilters({ search: '', city: '', category: '', rating: '', sort: '' });
  };

  return (
    <div className="animate-fadeIn">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Browse Listings</h1>
          <p className="text-slate-300">Find housing, schools, and hospitals across top Indian cities</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowMobileFilter(!showMobileFilter)}
          className="lg:hidden w-full mb-4 flex items-center justify-center gap-2 bg-white border border-slate-200 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {showMobileFilter ? 'Hide Filters' : 'Show Filters'}
        </button>

        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <div className={`${showMobileFilter ? 'block' : 'hidden'} lg:block w-full lg:w-72 flex-shrink-0`}>
            <FilterPanel filters={filters} onFilterChange={setFilters} onClear={clearFilters} />
          </div>

          {/* Listings Grid */}
          <div className="flex-1">
            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-slate-500">
                Showing <span className="font-semibold text-slate-800">{filteredListings.length}</span> listings
              </p>
            </div>

            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredListings.map((listing) => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">No listings found</h3>
                <p className="text-slate-500 mb-4">Try adjusting your filters or search term</p>
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>}>
      <ListingsContent />
    </Suspense>
  );
}
