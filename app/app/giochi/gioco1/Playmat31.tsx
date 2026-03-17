'use client';

import { useMemo } from 'react';
import { Carta } from '@/app/components/Carta';
import { Carta as CartaType } from '@/app/types/cards';
import useGameStore from '@/app/store/useGameStore';
import { checkScoreSet, getPunteggioSet } from '@/app/utils/cardUtils';
import { chunkArray } from '@/app/utils/utils';

export default function Playmat31() {
  const { playersDecks } = useGameStore();

  
  const computedGameData = useMemo(() => {
    
    const allPlayersQuintuple = playersDecks.map(deck => 
      chunkArray(deck.shownDeck, 5) as CartaType[][]
    );

    
    return allPlayersQuintuple.map((quintuple, deckIndex) => {
      const opponentIndex = (deckIndex + 1) % 2;
      const opponentQuintuple = allPlayersQuintuple[opponentIndex];

      return quintuple.map((gruppo, gIndex) => {
        const punteggio = getPunteggioSet(gruppo);
        const gruppoAvversario = opponentQuintuple[gIndex];
        
        const isWinner = gruppoAvversario ? checkScoreSet(gruppo, gruppoAvversario) : false;

        return {
          gruppo,
          punteggio,
          isWinner,
          key: `group_${deckIndex}_${gIndex}`
        };
      });
    });
  }, [playersDecks]);

  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-thin">
      <div className="flex flex-col gap-8 min-w-max">
        {computedGameData.map((playerGroups, deckIndex) => (
          <div className='flex flex-nowrap gap-4 items-end' key={'playeddeck_' + deckIndex}>
            {playerGroups.map((item) => (
              <div
                key={item.key}
                className={`gap-2 p-2 border-2 rounded-lg transition-colors
                  ${item.isWinner ? 'border-green-500 bg-green-900/10' : 'border-blue-500 bg-slate-800/50'}`
                }
              >
                <div className='text-center text-white font-bold'>
                  {item.punteggio}
                  {item.isWinner ? ' 👑' : ''}
                </div>
                <div className='flex gap-2'>
                  {item.gruppo.map((card) => (
                    <div key={card.id} className="shrink-0">
                      <Carta
                        carta={card}
                        isFlipped={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}