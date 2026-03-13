'use client';

import { Carta as CartaType } from '@/app/types/cards';
import { SIMBOLI_SEME, COLORI_SEME } from '@/app/utils/cardUtils';

interface CartaProps {
  carta: CartaType;
  isFlipped: boolean;
  isSelected?:boolean;
}

export function Carta({ carta, isFlipped,isSelected }: CartaProps) {
  const simbolo = SIMBOLI_SEME[carta.seme];
  const colore = COLORI_SEME[carta.seme];

  return (
    <div
      className='w-24 h-32 relative transition-transform duration-500'
      style={{
        transformStyle: 'preserve-3d',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}
    >
      {/* Fronte */}
      <div
        className={"absolute w-full h-full bg-white border-2 rounded-lg shadow-lg flex items-center justify-center "+(isSelected?'border-green-500':'border-gray-800')}
        style={{ backfaceVisibility: 'hidden' }}
      >
        <div className={`text-2xl font-bold ${colore}`}>{carta.valore.symbol}</div>
        <div className={`text-3xl ${colore}`}>{simbolo}</div>
      </div>

      {/* Retro */}
      <div
        className="absolute w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 border-2 border-blue-900 rounded-lg shadow-lg flex items-center justify-center"
        style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
        }}
      >
        <div className="text-white text-3xl opacity-50">🂠</div>
      </div>
    </div>
  );
}
