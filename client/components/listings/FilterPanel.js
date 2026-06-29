'use client';

// ============================================================
// FILTER PANEL COMPONENT
// ============================================================
// Sidebar filter for listings page.
// Filters: city, category, minimum rating, search text.
// ============================================================

import { cities } from '@/data/seedData';

export default function FilterPanel({ filters, onFilterChange, onClear }) {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const activeCount = Object.values(filters).filter(v => v && v !== '').length;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
          {activeCount > 0 && (
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
              {activeCount}
            </span>
          )}
        </h3>
        {activeCount > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-slate-500 hover:text-red-600 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Search</label>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={filters.search || ''}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder="Search listings..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-800 placeholder-slate-400"
          />
        </div>
      </div>

      {/* City Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1.5">City</label>
        <select
          value={filters.city || ''}
          onChange={(e) => handleChange('city', e.target.value)}
          className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-800 bg-white"
        >
          <option value="">All Cities</option>
          {cities.map(city => (
            <option key={city._id} value={city.name}>{city.name}</option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
        <div className="flex flex-col gap-2">
          {[
            { value: '', label: 'All Categories', icon: '📋' },
            { value: 'housing', label: 'Housing', icon: '🏠' },
            { value: 'school', label: 'Schools', icon: '🎓' },
            { value: 'hospital', label: 'Hospitals', icon: '🏥' },
          ].map(cat => (
            <button
              key={cat.value}
              onClick={() => handleChange('category', cat.value)}
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all text-left ${
                filters.category === cat.value
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 font-medium'
                  : 'text-slate-600 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Minimum Rating</label>
        <select
          value={filters.rating || ''}
          onChange={(e) => handleChange('rating', e.target.value)}
          className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-800 bg-white"
        >
          <option value="">Any Rating</option>
          <option value="4.5">4.5+ ⭐</option>
          <option value="4">4.0+ ⭐</option>
          <option value="3.5">3.5+ ⭐</option>
          <option value="3">3.0+ ⭐</option>
        </select>
      </div>

      {/* Sort */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Sort By</label>
        <select
          value={filters.sort || ''}
          onChange={(e) => handleChange('sort', e.target.value)}
          className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-800 bg-white"
        >
          <option value="">Default</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">Newest First</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>
    </div>
  );
}
