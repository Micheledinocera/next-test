'use client';

import Link from 'next/link';

export default function GiochiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-900 p-8">
      <Link
        href="/app"
        className="mb-6 inline-block px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
      >
        ← Indietro
      </Link>
      <div className="max-w-2xl mx-auto">
        {children}
      </div>
    </div>
  );
}
