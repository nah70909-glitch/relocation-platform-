'use client';

// ============================================================
// ADMIN LAYOUT
// ============================================================
// Wraps admin pages with a sidebar navigation.
// Checks if user is authenticated and has admin role.
// ============================================================

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const { isAdmin, isAuthenticated, loading } = useAuth();
  const pathname = usePathname();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  // Redirect if not admin
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl border border-slate-100 p-8 max-w-md mx-4 shadow-sm">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Admin Access Required</h2>
          <p className="text-slate-500 text-sm mb-4">
            You need admin privileges to access this page.
          </p>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4">
            <p className="text-xs text-blue-700 font-medium">Login as admin:</p>
            <p className="text-xs text-blue-600">admin@relocity.com / admin123</p>
          </div>
          <Link
            href="/login"
            className="inline-block bg-gradient-to-r from-blue-600 to-violet-600 text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:from-blue-700 hover:to-violet-700 transition-all"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/listings', label: 'Listings', icon: '📋' },
    { href: '/admin/users', label: 'Users', icon: '👥' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 flex-col bg-white border-r border-slate-100 min-h-screen pt-4 sticky top-16 h-[calc(100vh-4rem)]">
          <div className="px-4 mb-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-8 h-8 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </span>
              Admin Panel
            </h2>
          </div>

          <nav className="flex-1 px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-1 transition-all ${
                  pathname === item.href
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="px-4 py-4 border-t border-slate-100">
            <Link href="/" className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Site
            </Link>
          </div>
        </aside>

        {/* Mobile Nav */}
        <div className="md:hidden w-full bg-white border-b border-slate-100 px-4 py-3 flex gap-2 overflow-x-auto sticky top-16 z-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                pathname === item.href
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
