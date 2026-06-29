'use client';

// ============================================================
// ADMIN LISTINGS PAGE — /admin/listings
// ============================================================
// Table of all listings with add, edit, delete, verify actions.
// ============================================================

import { useState } from 'react';
import { listings as seedListings, cities } from '@/data/seedData';
import StarRating from '@/components/ui/StarRating';

export default function AdminListingsPage() {
  const [listings, setListings] = useState([...seedListings]);
  const [showModal, setShowModal] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [formData, setFormData] = useState({
    title: '', category: 'housing', city: '', location: '', description: '', price: '', image: '',
  });

  // Toggle verified status
  const toggleVerify = (id) => {
    setListings(prev => prev.map(l =>
      l._id === id ? { ...l, verified: !l.verified } : l
    ));
  };

  // Delete listing
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this listing?')) {
      setListings(prev => prev.filter(l => l._id !== id));
    }
  };

  // Open add/edit modal
  const openModal = (listing = null) => {
    if (listing) {
      setEditingListing(listing);
      setFormData({
        title: listing.title,
        category: listing.category,
        city: listing.city,
        location: listing.location,
        description: listing.description,
        price: listing.price,
        image: listing.image,
      });
    } else {
      setEditingListing(null);
      setFormData({ title: '', category: 'housing', city: '', location: '', description: '', price: '', image: '' });
    }
    setShowModal(true);
  };

  // Save listing (add or update)
  const handleSave = (e) => {
    e.preventDefault();
    if (editingListing) {
      setListings(prev => prev.map(l =>
        l._id === editingListing._id ? { ...l, ...formData } : l
      ));
    } else {
      const newListing = {
        _id: `listing-${Date.now()}`,
        ...formData,
        rating: 0,
        reviewCount: 0,
        verified: false,
        createdBy: 'admin',
        createdAt: new Date(),
        contact: { phone: '', email: '' },
      };
      setListings(prev => [newListing, ...prev]);
    }
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Listings</h1>
          <p className="text-sm text-slate-500">{listings.length} total listings</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-violet-700 transition-all shadow-md flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Listing
        </button>
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Listing</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Category</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">City</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Rating</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {listings.map((listing) => (
                <tr key={listing._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={listing.image} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-slate-800 line-clamp-1">{listing.title}</p>
                        <p className="text-xs text-slate-500">{listing.price}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      listing.category === 'housing' ? 'bg-blue-100 text-blue-700' :
                      listing.category === 'school' ? 'bg-violet-100 text-violet-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {listing.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{listing.city}</td>
                  <td className="px-4 py-3">
                    <StarRating rating={listing.rating} size="sm" />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleVerify(listing._id)}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${
                        listing.verified
                          ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                          : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                      }`}
                    >
                      {listing.verified ? '✓ Verified' : 'Pending'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openModal(listing)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(listing._id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900">
                  {editingListing ? 'Edit Listing' : 'Add New Listing'}
                </h2>
                <button onClick={() => setShowModal(false)} className="p-1 hover:bg-slate-100 rounded-lg">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                  <input name="title" value={formData.title} onChange={handleChange} required className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 text-slate-800" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800">
                      <option value="housing">Housing</option>
                      <option value="school">School</option>
                      <option value="hospital">Hospital</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                    <select name="city" value={formData.city} onChange={handleChange} required className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800">
                      <option value="">Select City</option>
                      {cities.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                  <input name="location" value={formData.location} onChange={handleChange} className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 text-slate-800" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} required rows={3} className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 resize-none text-slate-800" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Price</label>
                    <input name="price" value={formData.price} onChange={handleChange} placeholder="₹15,000/month" className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
                    <input name="image" value={formData.image} onChange={handleChange} placeholder="https://..." className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 text-slate-800" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-violet-700 transition-all shadow-md">
                    {editingListing ? 'Update' : 'Create'} Listing
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
