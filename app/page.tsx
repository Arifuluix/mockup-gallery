'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { Zap, Upload, Share2, Eye } from 'lucide-react';

export default function Home() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-purple-500 to-secondary">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Share Your Design Mockups</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Create a beautiful portfolio to showcase your UI/UX designs
          </p>
          <div className="flex gap-4 justify-center">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/upload"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
                >
                  Upload Mockup
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/signup"
                  className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Why MockupGallery?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Easy Upload</h3>
              <p className="text-gray-600">Upload your design mockups in seconds</p>
            </div>
            <div className="text-center">
              <Eye className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Beautiful Gallery</h3>
              <p className="text-gray-600">Showcase your work in a stunning gallery</p>
            </div>
            <div className="text-center">
              <Share2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Share Easily</h3>
              <p className="text-gray-600">Generate shareable links for clients</p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Lightning Fast</h3>
              <p className="text-gray-600">Optimized for speed and performance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
