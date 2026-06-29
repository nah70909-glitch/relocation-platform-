// ============================================================
// CITY DETAIL PAGE — /cities/[id]
// ============================================================
// Detailed city guide with cost of living, areas, transport,
// and links to related listings.
// ============================================================

import Link from 'next/link';
import { cities, listings } from '@/data/seedData';

export default function CityDetailPage({ params }) {
  const { id } = params;
  const city = cities.find(c => c._id === id);

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">City Not Found</h2>
          <Link href="/cities" className="text-blue-600 hover:underline">← Back to Cities</Link>
        </div>
      </div>
    );
  }

  // Get listings for this city
  const cityListings = listings.filter(l => l.city === city.name).slice(0, 6);

  // Cost of living colors
  const costColors = {
    'Low': 'text-emerald-600',
    'Medium': 'text-amber-600',
    'High': 'text-red-600',
    'Very High': 'text-red-700',
  };

  return (
    <div className="animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={city.image} alt={city.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-6 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/cities" className="text-sm text-white/70 hover:text-white mb-2 inline-flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
              All Cities
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{city.name}</h1>
            <p className="text-white/80 text-sm mt-1">{city.population} • {city.costOfLiving?.overall} Cost of Living</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Overview */}
            <section className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-3">About {city.name}</h2>
              <p className="text-slate-600 leading-relaxed">{city.description}</p>
              {city.lifestyle && (
                <p className="text-slate-600 leading-relaxed mt-3">{city.lifestyle}</p>
              )}
            </section>

            {/* Famous Areas */}
            <section className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">📍 Popular Areas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {city.famousAreas?.map((area, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-4 hover:bg-blue-50 transition-colors">
                    <h3 className="font-semibold text-slate-800 mb-1">{area.name}</h3>
                    <p className="text-sm text-slate-500">{area.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Transport */}
            <section className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">🚇 Transportation</h2>
              <div className="flex flex-wrap gap-2">
                {city.transport?.map((t, i) => (
                  <span key={i} className="bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1.5 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </section>

            {/* Hospitals & Schools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-3">🏥 Top Hospitals</h2>
                <ul className="space-y-2">
                  {city.hospitals?.map((h, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </section>
              <section className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-3">🎓 Top Schools</h2>
                <ul className="space-y-2">
                  {city.schools?.map((s, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-violet-500 rounded-full flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Cost of Living Card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm sticky top-20">
              <h3 className="text-lg font-bold text-slate-900 mb-4">💰 Cost of Living</h3>
              <div className={`text-2xl font-bold mb-4 ${costColors[city.costOfLiving?.overall]}`}>
                {city.costOfLiving?.overall}
              </div>
              <div className="space-y-3">
                <CostBar label="Rent" value={city.costOfLiving?.rent} max={30000} prefix="₹" suffix="/mo" />
                <CostBar label="Food" value={city.costOfLiving?.food} max={10000} prefix="₹" suffix="/mo" />
                <CostBar label="Transport" value={city.costOfLiving?.transport} max={5000} prefix="₹" suffix="/mo" />
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="text-sm text-slate-500 mb-3">Find services in {city.name}</p>
                <Link
                  href={`/listings?city=${city.name}`}
                  className="block text-center bg-gradient-to-r from-blue-600 to-violet-600 text-white py-2.5 rounded-lg font-medium text-sm hover:from-blue-700 hover:to-violet-700 transition-all shadow-md"
                >
                  Browse Listings in {city.name}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Listings */}
        {cityListings.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Listings in {city.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cityListings.map((listing) => (
                <Link key={listing._id} href={`/listings/${listing._id}`} className="group">
                  <div className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all">
                    <div className="h-36 overflow-hidden">
                      <img src={listing.image} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-semibold text-blue-600 uppercase">{listing.category}</span>
                      <h3 className="font-semibold text-slate-800 mt-1 group-hover:text-blue-600 transition-colors">{listing.title}</h3>
                      <p className="text-sm text-slate-500 mt-1">{listing.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// Cost bar sub-component
function CostBar({ label, value, max, prefix = '', suffix = '' }) {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-600">{label}</span>
        <span className="font-medium text-slate-800">{prefix}{value?.toLocaleString('en-IN')}{suffix}</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-violet-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return cities.map((city) => ({
    id: city._id,
  }));
}
