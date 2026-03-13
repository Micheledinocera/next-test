'use client';

import { Carta } from '@/app/components/Carta';
import { Carta as CartaType } from '@/app/types/cards';
import useGameStore from '@/app/store/useGameStore';
import { checkScore, checkScoreSet, getPunteggioSet } from '@/app/utils/cardUtils';

export default function Playmat() {
  const gameStore = useGameStore();

  const chunkArray = (arr: any[], size: number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-thin">
      <div className="flex flex-col gap-8 min-w-max">
        {gameStore.playersDecks.map((deck, deckIndex) => {
          // Dividiamo il mazzo del giocatore in gruppi di 5
          const quintuple = chunkArray(deck.shownDeck, 5) as CartaType[][];
          // Recuperiamo il mazzo dell'avversario per il confronto dello score
          const opponentQuintuple = chunkArray(gameStore.playersDecks[(deckIndex + 1) % 2].shownDeck, 5) as CartaType[][];

          return (
            <div className='flex flex-nowrap gap-4 items-end' key={'playeddeck_' + deckIndex}>
              {quintuple.map((gruppo, gIndex) => (
                <div
                  key={`group_${deckIndex}_${gIndex}`}
                  className={`gap-2 p-2 border-2 rounded-lg 
                    ${checkScoreSet(gruppo, opponentQuintuple[gIndex]) ? 'border-green-500' : 'border-blue-500'}`
                  }
                >
                  <div className='text-center text-white font-bold'>
                    {getPunteggioSet(gruppo)}
                    {checkScoreSet(gruppo, opponentQuintuple[gIndex]) ? '👑' : ''}
                  </div>
                  <div className='flex gap-2'>
                    {gruppo.map((card, cardIndex) => {
                      // Calcoliamo l'indice assoluto della carta nel mazzo originale
                      // const absoluteIndex = gIndex * 5 + cardIndex;
                      // const isWinner = checkScore(card, opponentDeck[absoluteIndex]);

                      return (
                        <div
                          key={'playedcard_' + deckIndex + '_' + cardIndex}
                          className="shrink-0"
                        >
                          <Carta
                            carta={card}
                            isFlipped={false}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}</div>
          );
        })}
        {/* {gameStore.playersDecks.map((deck, deckIndex) =>
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
        )} */}
      </div>
    </div>
  );
}
