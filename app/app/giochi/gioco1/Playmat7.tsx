'use client';

import { Carta } from '@/app/components/Carta';
import { Carta as CartaType, Seme } from '@/app/types/cards';
import useGameStore from '@/app/store/useGameStore';
import { checkScoreSet, getPunteggioSet, SEMI } from '@/app/utils/cardUtils';
import { SIMBOLI_SEME, COLORI_SEME } from '@/app/utils/cardUtils';
import { chunkArray } from '@/app/utils/utils';
import { useMemo } from 'react';

export default function Playmat31() {
  const { playersDecks } = useGameStore();
  const computedDecks = useMemo(() => {
    const semiCards = playersDecks.map(deck => {
      let objToReturn: Record<Seme, CartaType[]> = { Ori: [], Bastoni: [], Coppe: [], Spade: [] };
      SEMI.forEach(seme => {
        objToReturn[seme] = deck.shownDeck.filter(card => card.seme === seme);
      });
      return objToReturn;
    });

    return SEMI.map(seme => {
      const rows = semiCards.map((playerSemiCards, playerIdx) => {
        const opponentIdx = (playerIdx + 1) % 2;
        const currentCoppie = chunkArray(playerSemiCards[seme], 2) as CartaType[][];
        const opponentCoppie = chunkArray(semiCards[opponentIdx][seme], 2) as CartaType[][];

        return currentCoppie.map((coppia, cIdx) => ({
          coppia,
          punteggio: getPunteggioSet(coppia, 'value7'),
          isWinner: checkScoreSet(coppia, opponentCoppie[cIdx], 'value7'),
          key: `coppia_${seme}_p${playerIdx}_c${cIdx}`
        }));
      });

      return { seme, rows };
    });
  }, [playersDecks]);

  return (
    <div className="w-full flex flex-col pb-4 overflow-x-auto gap-8 scrollbar-thin">
      {computedDecks.map(({ seme, rows }) => (
        <div key={`group_seme_${seme}`} className={`flex gap-8 min-w-max ${COLORI_SEME[seme]}`}>
          <div className='w-6 h-6 rounded-lg m-auto bg-white text-center'>
            {SIMBOLI_SEME[seme]}
          </div>

          <div className='flex gap-4 flex-col'>
            {rows.map((playerRow, playerIdx) => (
              <div className='flex gap-2 w-full' key={`row_${seme}_${playerIdx}`}>
                {playerRow.map((item) => (
                  <div
                    key={item.key}
                    className='p-2 flex flex-col gap-2 border-2 rounded-lg border-blue-500'
                  >
                    <div className='text-center text-white font-bold'>
                      {item.punteggio}
                      {item.isWinner ? ' 👑' : ''}
                    </div>
                    <div className='p-2 flex'>
                      {item.coppia.map((card, cardIdx) => (
                        <Carta key={`${item.key}_card_${cardIdx}`} carta={card} isFlipped={false} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
