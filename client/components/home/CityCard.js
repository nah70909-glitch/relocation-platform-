'use client';

// ============================================================
// CITY CARD COMPONENT
// ============================================================
// Preview card for a city, shown on homepage and cities page.
// Shows city image, name, cost level, and key highlights.
// ============================================================

import Link from 'next/link';

export default function CityCard({ city }) {
  // Color mapping for cost of living level
  const costColors = {
    'Low': 'bg-emerald-100 text-emerald-700',
    'Medium': 'bg-amber-100 text-amber-700',
    'High': 'bg-red-100 text-red-700',
    'Very High': 'bg-red-200 text-red-800',
  };

  return (
    <Link href={`/cities/${city._id}`} className="group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group-hover:border-blue-200 group-hover:-translate-y-1">
        {/* City Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={city.image}
            alt={city.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* City name on image */}
          <div className="absolute bottom-3 left-4">
            <h3 className="text-xl font-bold text-white">{city.name}</h3>
            <p className="text-xs text-white/80">{city.population} people</p>
          </div>

          {/* Cost badge */}
          <div className="absolute top-3 right-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${costColors[city.costOfLiving?.overall] || costColors['Medium']}`}>
              {city.costOfLiving?.overall} Cost
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4">
          <p className="text-sm text-slate-600 line-clamp-2 mb-3">
            {city.description}
          </p>

          {/* Quick Stats */}
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <span>🏠</span>
              <span>₹{(city.costOfLiving?.rent / 1000).toFixed(0)}k/mo</span>
            </span>
            <span className="flex items-center gap-1">
              <span>🚇</span>
              <span>{city.transport?.length || 0} modes</span>
            </span>
            <span className="flex items-center gap-1">
              <span>📍</span>
              <span>{city.famousAreas?.length || 0} areas</span>
            </span>
          </div>

          {/* Explore button */}
          <div className="mt-3 pt-3 border-t border-slate-100">
            <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700 flex items-center gap-1 transition-colors">
              Explore City Guide
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
