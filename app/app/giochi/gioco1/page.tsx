'use client';

import { useEffect, useState } from 'react';
import { Giocatore } from '@/app/components/Giocatore';
import useGameStore, { selectIsGameOver } from '@/app/store/useGameStore';
import Playmat31 from './Playmat31';
import Playmat7 from './Playmat7';

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
      playAndCalc();
      interval = setInterval(() => {
        playAndCalc();
      }, 1000);
    }

    return () => {
      if (interval)
        clearInterval(interval);

    };
  }, [isPlaying, isGameOver]);

  const playAndCalc = () => {
    gameStore.pescaPerTutti(5);
    gameStore.calcScore();
  }

  const toggleGioco = () => {
    if (isGameOver) return;
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-8">
      <button
        onClick={toggleGioco}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        disabled={isPlaying}
      >
        {isGameOver || isPlaying ? 'Mazzo Vuoto' : 'Gioca'}
      </button>
      <div className='flex justify-evenly'>
        <Giocatore
          nome={`Giocatore 1`}
          mazzoChiuso={gameStore.playersDecks[0].drawDeck}
          index={0}
        />

        <Giocatore
          nome={`Giocatore 2`}
          mazzoChiuso={gameStore.playersDecks[1].drawDeck}
          index={1}
        />

      </div>
      31
      <Playmat31 />
      7 1/2
      <Playmat7 />


    </div>
  );
}
