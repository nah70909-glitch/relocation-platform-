'use client';

// ============================================================
// CITIES PAGE — /cities
// ============================================================
// Grid of all city guides with search functionality.
// ============================================================

import { useState } from 'react';
import CityCard from '@/components/home/CityCard';
import { cities } from '@/data/seedData';

export default function CitiesPage() {
  const [search, setSearch] = useState('');

  // Filter cities by search query
  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(search.toLowerCase()) ||
    city.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fadeIn">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">City Guides</h1>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            Explore detailed guides for India&apos;s top cities. Everything you need to know before relocating.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search cities..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredCities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCities.map((city) => (
              <CityCard key={city._id} city={city} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🏙️</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No cities found</h3>
            <p className="text-slate-500">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
}
