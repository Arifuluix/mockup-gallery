import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { LogOut, Home, Upload, User } from 'lucide-react';

export default function Navbar() {
  const { user } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg"></div>
            <span className="font-bold text-xl text-gray-800">MockupGallery</span>
          </Link>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <Link href="/dashboard" className="flex items-center space-x-1 text-gray-700 hover:text-primary transition">
                  <Home size={20} />
                  <span>Dashboard</span>
                </Link>
                <Link href="/upload" className="flex items-center space-x-1 text-gray-700 hover:text-primary transition">
                  <Upload size={20} />
                  <span>Upload</span>
                </Link>
                <Link href="/profile" className="flex items-center space-x-1 text-gray-700 hover:text-primary transition">
                  <User size={20} />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-red-500 hover:text-red-700 transition"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-primary transition">
                  Login
                </Link>
                <Link href="/signup" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
