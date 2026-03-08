'use client';

import Link from 'next/link';

export default function Gioco2Page() {
  return (
    <div className="text-center py-16">
      <h2 className="text-3xl font-bold text-white mb-4">Gioco 2</h2>
      <p className="text-gray-300 mb-6">Prossimamente...</p>
      <Link
        href="/app"
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
      >
        ← Indietro
      </Link>
    </div>
  );
}
