'use client';

import { useAuthStore } from '@/lib/store';
import ProtectedRoute from '@/components/ProtectedRoute';
import { User, Mail, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuthStore();

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-12">Profile</h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">{user?.displayName || 'User'}</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-lg font-medium text-gray-800">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
              <User className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-gray-600">Display Name</p>
                <p className="text-lg font-medium text-gray-800">{user?.displayName}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="text-lg font-medium text-gray-800">
                  {user?.metadata?.creationTime
                    ? new Date(user.metadata.creationTime).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <button className="w-full mt-8 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition">
            Edit Profile
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
