'use client';

// ============================================================
// HOMEPAGE
// ============================================================
// Landing page with hero section, search, featured cities,
// service categories, testimonials, and CTA.
// ============================================================

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CityCard from '@/components/home/CityCard';
import { cities, categories, testimonials } from '@/data/seedData';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/listings?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="animate-fadeIn">

      {/* ============================================================
          HERO SECTION
          ============================================================ */}
      <section className="hero-gradient relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-500 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-blue-200 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/10">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Trusted by 10,000+ relocators across India
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Relocate to Your
              <span className="block bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                Dream City
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Explore city guides, find housing, schools, hospitals, and connect with verified service providers. Your complete relocation companion.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8">
              <div className="flex bg-white rounded-xl shadow-2xl shadow-black/20 overflow-hidden">
                <div className="flex-1 flex items-center px-4">
                  <svg className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for housing, schools, hospitals..."
                    className="w-full py-4 text-slate-800 placeholder-slate-400 outline-none text-sm"
                    id="hero-search"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white px-6 py-4 font-medium transition-all text-sm flex-shrink-0"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Quick links */}
            <div className="flex flex-wrap justify-center gap-3">
              <QuickLink href="/listings?category=housing" icon="🏠" label="Housing" />
              <QuickLink href="/listings?category=school" icon="🎓" label="Schools" />
              <QuickLink href="/listings?category=hospital" icon="🏥" label="Hospitals" />
              <QuickLink href="/cities" icon="🌆" label="City Guides" />
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full fill-slate-50">
            <path d="M0,32L80,36C160,40,320,48,480,48C640,48,800,40,960,35.3C1120,30.7,1280,28.3,1360,27L1440,26L1440,60L1360,60C1280,60,1120,60,960,60C800,60,640,60,480,60C320,60,160,60,80,60L0,60Z" />
          </svg>
        </div>
      </section>

      {/* ============================================================
          STATS SECTION
          ============================================================ */}
      <section className="py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard number="6+" label="Cities Covered" icon="🏙️" />
            <StatCard number="24+" label="Verified Listings" icon="✅" />
            <StatCard number="100+" label="Happy Users" icon="😊" />
            <StatCard number="50+" label="Reviews" icon="⭐" />
          </div>
        </div>
      </section>

      {/* ============================================================
          FEATURED CITIES
          ============================================================ */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Explore</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-3">
              Popular City Guides
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Discover everything you need to know about India&apos;s top cities before you relocate.
            </p>
          </div>

          {/* City Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city) => (
              <CityCard key={city._id} city={city} />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-10">
            <Link
              href="/cities"
              className="inline-flex items-center gap-2 bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-xl font-medium transition-all shadow-sm"
            >
              View All Cities
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          SERVICE CATEGORIES
          ============================================================ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-violet-600 uppercase tracking-wider">Services</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-3">
              What We Help You Find
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Browse verified listings across key relocation categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/listings?category=${cat.id}`}
                className="group"
              >
                <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100 p-8 text-center hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300">
                  <div className="text-5xl mb-4">{cat.icon}</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">{cat.description}</p>
                  <span className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
                    Browse {cat.count}+ listings
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          TESTIMONIALS
          ============================================================ */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-3">
              Loved by Relocators
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA SECTION
          ============================================================ */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-violet-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Relocate?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of people who found their perfect home, school, and healthcare provider through ReloCity.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl font-semibold transition-colors shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              href="/listings"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20 px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              Browse Listings
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// SUB-COMPONENTS
// ============================================================

function QuickLink({ href, icon, label }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-4 py-2 rounded-full text-sm font-medium transition-all border border-white/10"
    >
      <span>{icon}</span>
      {label}
    </Link>
  );
}

function StatCard({ number, label, icon }) {
  return (
    <div className="text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl md:text-3xl font-bold text-slate-900">{number}</div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  );
}
