// ============================================================
// ROOT LAYOUT
// ============================================================
// The root layout wraps every page in the app.
// Includes: Google Font (Inter), AuthProvider, Navbar, Footer.
// ============================================================

import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';

// Load Inter font from Google Fonts
const inter = Inter({ subsets: ['latin'] });

// SEO metadata
export const metadata = {
  title: 'ReloCity — Inter-City Relocation Guide',
  description: 'Find housing, schools, hospitals, and services in your new city. ReloCity is your trusted partner for inter-city relocation in India.',
  keywords: 'relocation, city guide, housing, schools, hospitals, India',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50`}>
        <AuthProvider>
          {/* Navigation Bar — fixed at top */}
          <Navbar />

          {/* Main Content — pushed down by navbar height */}
          <main className="min-h-screen pt-16">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
