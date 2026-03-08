'use client';

import { useState } from 'react';
import { GameCard } from './components/GameCard';
import { GiochiContainer } from './giochi/GiochiContainer';

type Gioco = 'menu' | 'gioco1' | 'gioco2';

export default function AppPage() {
  const [giocoAttivo, setGiocoAttivo] = useState<Gioco>('menu');

  if (giocoAttivo !== 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-900 p-8">
        <button
          onClick={() => setGiocoAttivo('menu')}
          className="mb-6 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
        >
          ← Indietro
        </button>
        <div className="max-w-2xl mx-auto">
          <GiochiContainer gioco={giocoAttivo as 'gioco1' | 'gioco2'} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-blue-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">🂠 Carte Napoletane 🂠</h1>
          <p className="text-blue-200 text-lg">Scegli un gioco</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GameCard
            title="Gioco 1"
            description="Scopri le carte e crea il tuo mazzo"
            onClick={() => setGiocoAttivo('gioco1')}
          />
          <GameCard
            title="Gioco 2"
            description="Prossimamente..."
            onClick={() => setGiocoAttivo('gioco2')}
          />
        </div>
      </div>
    </div>
  );
}
