'use client';

import { Giocatore } from '@/app/components/Giocatore';
import useGameStore from '@/app/store/useGameStore';

export default function Gioco2Page() {
  const gameStore = useGameStore();

  return (
    <div className="space-y-8">
      <Giocatore
        nome={`Giocatore 1`}
        mazzoChiuso={gameStore.playersDecks[0].drawDeck}
        index={0}
      />

      {/* <Playmat /> */}

      <Giocatore
        nome={`Giocatore 2`}
        mazzoChiuso={gameStore.playersDecks[1].drawDeck}
        index={1}
      />
    </div>
  );
}
