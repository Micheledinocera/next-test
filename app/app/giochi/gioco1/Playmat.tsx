'use client';

import { useEffect, useState } from 'react';
import { Carta } from '@/app/components/Carta';
import useGameStore from '@/app/store/useGameStore';

export default function Playmat() {

  const gameStore = useGameStore();

  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-thin">
      <div className="flex flex-col gap-8 min-w-max">
        {gameStore.playersDecks.map((deck, deckIndex) =>
          <div className='flex flex-nowrap gap-2' key={'playeddeck_' + deckIndex}>
            {deck.shownDeck.map((card, cardIndex) =>
              <div
                key={'playedcard_' + deckIndex + '_' + cardIndex}
                className="shrink-0"
              >
                <Carta carta={card} isFlipped={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
