'use client';

import { useEffect, useState } from 'react';
import { Giocatore } from '@/app/components/Giocatore';
import useGameStore, { selectIsGameOver } from '@/app/store/useGameStore';

export default function Gioco1Page() {
  const gameStore = useGameStore();
  const isGameOver = useGameStore(selectIsGameOver);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    gameStore.initDecks();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && !isGameOver) {
      interval = setInterval(() => {
        gameStore.pescaPerTutti();
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, isGameOver]);

  const toggleGioco = () => {
    if (isGameOver) return;
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-8">

      {gameStore.playersDecks.map((deck, index) => (
        <Giocatore
          key={index} // Obbligatorio in React per le liste
          nome={`Giocatore ${index + 1}`}
          mazzoChiuso={deck.drawDeck}
          mazzoAperto={deck.shownDeck}
        />
      ))}

      <button
        onClick={toggleGioco}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        disabled={isPlaying}
      >
        {isGameOver || isPlaying ? 'Mazzo Vuoto' : 'Gioca'}
      </button>
    </div>
  );
}
