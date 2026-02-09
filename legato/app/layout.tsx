import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Legato - Legal Consultation Platform',
  description: 'Connect with expert lawyers for virtual consultations. Book appointments, share documents, and get legal advice.',
  keywords: ['legal', 'lawyers', 'consultation', 'legal advice', 'virtual lawyer'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            {/* ADD THIS CONTAINER WRAPPER */}
            <div className="flex-1">
              <main className="container mx-auto px-4 sm:px-6 lg:px-8">
                {children}
              </main>
            </div>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}