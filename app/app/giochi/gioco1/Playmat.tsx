'use client';

import { Carta } from '@/app/components/Carta';
import useGameStore from '@/app/store/useGameStore';
import { checkScore } from '@/app/utils/cardUtils';

export default function Playmat() {
  const gameStore = useGameStore();

  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-thin">
      <div className="flex flex-col gap-8 min-w-max">
        {gameStore.playersDecks.map((deck, deckIndex) =>
          <div className='flex flex-nowrap gap-2 items-end' key={'playeddeck_' + deckIndex}>
            {deck.shownDeck.map((card, cardIndex) =>
              <div
                key={'playedcard_' + deckIndex + '_' + cardIndex}
                className="shrink-0"
              >
                {checkScore(card,gameStore.playersDecks[(deckIndex+1)%2].shownDeck[cardIndex])?
                  <div className='text-center' > 👑 </div>:
                  null
                }
                <Carta carta={card} isFlipped={false} isSelected={checkScore(card,gameStore.playersDecks[(deckIndex+1)%2].shownDeck[cardIndex])}/>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
