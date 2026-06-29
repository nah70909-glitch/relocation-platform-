'use client';

// ============================================================
// ADMIN DASHBOARD — /admin
// ============================================================
// Overview page with stats cards and recent activity.
// ============================================================

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/services/api';
import { listings, cities } from '@/data/seedData';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);

  // Try to fetch stats from API, fall back to seed data
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/stats');
        if (response.data.success) {
          setStats(response.data.data);
          return;
        }
      } catch {
        // API not available, use computed stats from seed data
      }
      // Fallback stats
      setStats({
        totalUsers: 3,
        totalListings: listings.length,
        totalReviews: 15,
        totalCities: cities.length,
        verifiedListings: listings.filter(l => l.verified).length,
        unverifiedListings: listings.filter(l => !l.verified).length,
        categoryCounts: {
          housing: listings.filter(l => l.category === 'housing').length,
          school: listings.filter(l => l.category === 'school').length,
          hospital: listings.filter(l => l.category === 'hospital').length,
        },
      });
    };
    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-sm text-slate-500 mt-1">Welcome to the ReloCity admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="👥" label="Total Users" value={stats.totalUsers} color="blue" />
        <StatCard icon="📋" label="Total Listings" value={stats.totalListings} color="violet" />
        <StatCard icon="⭐" label="Total Reviews" value={stats.totalReviews} color="amber" />
        <StatCard icon="🏙️" label="Cities Covered" value={stats.totalCities} color="emerald" />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Verification Status */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Listing Verification</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 flex items-center gap-2">
                <span className="w-3 h-3 bg-emerald-500 rounded-full" />
                Verified
              </span>
              <span className="font-bold text-slate-800">{stats.verifiedListings}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all"
                style={{ width: `${(stats.verifiedListings / stats.totalListings) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 flex items-center gap-2">
                <span className="w-3 h-3 bg-amber-500 rounded-full" />
                Pending Verification
              </span>
              <span className="font-bold text-slate-800">{stats.unverifiedListings}</span>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Listings by Category</h3>
          <div className="space-y-3">
            {[
              { label: 'Housing', icon: '🏠', count: stats.categoryCounts.housing, color: 'bg-blue-500' },
              { label: 'Schools', icon: '🎓', count: stats.categoryCounts.school, color: 'bg-violet-500' },
              { label: 'Hospitals', icon: '🏥', count: stats.categoryCounts.hospital, color: 'bg-emerald-500' },
            ].map((cat) => (
              <div key={cat.label} className="flex items-center justify-between">
                <span className="text-sm text-slate-600 flex items-center gap-2">
                  <span>{cat.icon}</span>
                  {cat.label}
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-slate-100 rounded-full h-2">
                    <div
                      className={`${cat.color} h-2 rounded-full`}
                      style={{ width: `${(cat.count / stats.totalListings) * 100}%` }}
                    />
                  </div>
                  <span className="font-bold text-slate-800 text-sm w-6 text-right">{cat.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link href="/admin/listings" className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group">
            <span className="text-2xl">➕</span>
            <div>
              <p className="text-sm font-medium text-slate-800 group-hover:text-blue-700">Manage Listings</p>
              <p className="text-xs text-slate-500">Add, edit, or remove listings</p>
            </div>
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 p-4 bg-violet-50 rounded-xl hover:bg-violet-100 transition-colors group">
            <span className="text-2xl">👥</span>
            <div>
              <p className="text-sm font-medium text-slate-800 group-hover:text-violet-700">Manage Users</p>
              <p className="text-xs text-slate-500">View and manage user roles</p>
            </div>
          </Link>
          <Link href="/cities" className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors group">
            <span className="text-2xl">🌆</span>
            <div>
              <p className="text-sm font-medium text-slate-800 group-hover:text-emerald-700">View City Guides</p>
              <p className="text-xs text-slate-500">Browse city information</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Stats card sub-component
function StatCard({ icon, label, value, color }) {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    violet: 'from-violet-500 to-violet-600',
    amber: 'from-amber-500 to-amber-600',
    emerald: 'from-emerald-500 to-emerald-600',
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        <div className={`w-10 h-10 bg-gradient-to-br ${colors[color]} rounded-xl opacity-10`} />
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}
