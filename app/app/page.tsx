'use client';

import Link from 'next/link';
import { GameCard } from '@/app/components/GameCard';

export default function AppPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-blue-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">🂠 Carte Napoletane 🂠</h1>
          <p className="text-blue-200 text-lg">Scegli un gioco</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="app/giochi/gioco1" className="block">
            <GameCard
              title="Gioco 1"
              description="Scopri le carte e crea il tuo mazzo"
            >
              <div className="mt-4 text-sm opacity-75">Clicca per giocare →</div>
            </GameCard>
          </Link>
          <Link href="app/giochi/gioco2" className="block">
            <GameCard
              title="Gioco 2"
              description="Prossimamente..."
            >
              <div className="mt-4 text-sm opacity-75">Non disponibile</div>
            </GameCard>
          </Link>
        </div>
      </div>
    </div>
  );
}
