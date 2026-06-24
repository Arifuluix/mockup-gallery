'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import { db, storage } from '@/lib/firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { Trash2, Share2, Plus, Image as ImageIcon } from 'lucide-react';

interface Mockup {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: any;
  isPublic: boolean;
}

export default function Dashboard() {
  const { user } = useAuthStore();
  const [mockups, setMockups] = useState<Mockup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchMockups = async () => {
      try {
        const q = query(collection(db, 'mockups'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const mockupsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Mockup[];
        setMockups(mockupsData);
      } catch (error) {
        console.error('Error fetching mockups:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMockups();
  }, [user]);

  const handleDelete = async (id: string, imageUrl: string) => {
    try {
      await deleteDoc(doc(db, 'mockups', id));

      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);

      setMockups(mockups.filter((m) => m.id !== id));
    } catch (error) {
      console.error('Error deleting mockup:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">My Mockups</h1>
            <p className="text-gray-600">Welcome back, {user?.displayName}!</p>
          </div>
          <Link
            href="/upload"
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition"
          >
            <Plus size={20} />
            Upload New
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your mockups...</p>
          </div>
        ) : mockups.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg">
            <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No mockups yet</h2>
            <p className="text-gray-600 mb-6">Start by uploading your first design mockup</p>
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition"
            >
              <Plus size={20} />
              Upload Mockup
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {mockups.map((mockup) => (
              <div key={mockup.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={mockup.imageUrl}
                    alt={mockup.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">{mockup.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{mockup.description}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 border border-primary text-primary py-2 rounded hover:bg-primary hover:text-white transition">
                      <Share2 size={16} />
                      Share
                    </button>
                    <button
                      onClick={() => handleDelete(mockup.id, mockup.imageUrl)}
                      className="flex-1 flex items-center justify-center gap-2 border border-red-500 text-red-500 py-2 rounded hover:bg-red-500 hover:text-white transition"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
