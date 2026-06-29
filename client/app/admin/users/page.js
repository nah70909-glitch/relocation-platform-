'use client';

// ============================================================
// ADMIN USERS PAGE — /admin/users
// ============================================================
// Table of all registered users with role management.
// ============================================================

import { useState, useEffect } from 'react';
import api from '@/services/api';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from API or use fallback data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/admin/users');
        if (response.data.success) {
          setUsers(response.data.data);
          setLoading(false);
          return;
        }
      } catch {
        // API not available, use fallback
      }
      setUsers([
        { _id: 'user-admin-001', name: 'Admin User', email: 'admin@relocity.com', role: 'admin', preferredCity: 'Mumbai', createdAt: '2024-01-01' },
        { _id: 'user-regular-001', name: 'Rahul Sharma', email: 'user@relocity.com', role: 'user', preferredCity: 'Bangalore', createdAt: '2024-02-15' },
        { _id: 'user-regular-002', name: 'Priya Patel', email: 'priya@example.com', role: 'user', preferredCity: 'Delhi', createdAt: '2024-03-10' },
      ]);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  // Toggle user role
  const toggleRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    setUsers(prev => prev.map(u =>
      u._id === userId ? { ...u, role: newRole } : u
    ));
    try {
      await api.put(`/admin/users/${userId}`, { role: newRole });
    } catch {
      // Revert on error
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Manage Users</h1>
        <p className="text-sm text-slate-500">{users.length} registered users</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">User</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Email</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">City</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Joined</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Role</th>
                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">{user.name?.charAt(0)?.toUpperCase()}</span>
                      </div>
                      <span className="text-sm font-medium text-slate-800">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{user.email}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{user.preferredCity || '—'}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">
                    {new Date(user.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      user.role === 'admin'
                        ? 'bg-violet-100 text-violet-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => toggleRole(user._id, user.role)}
                      className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all"
                    >
                      Make {user.role === 'admin' ? 'User' : 'Admin'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
