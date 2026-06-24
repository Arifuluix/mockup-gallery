import type { Metadata } from 'next';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'MockupGallery - Share Your Design Mockups',
  description: 'Create and share beautiful UI/UX design mockups with your team and clients.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen bg-gray-50">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
