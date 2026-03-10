'use client';

import { Carta as CartaType } from '@/app/types/cards';
import { Carta } from './Carta';

interface MazzoVisivoProps {
  carte: CartaType[];
  label: string;
}

export function MazzoVisivo({ carte, label }: MazzoVisivoProps) {
  if (carte.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-white text-sm font-semibold">{label}</div>
      <div className="relative w-24 h-32">
        {carte.slice(0, 3).reverse().map((carta, i) => (
          <div
            key={carta.id}
            className="absolute"
            style={{
              transform: `translateY(${i * 4}px) translateX(${i * 4}px) translateZ(${i * 10}px)`,
              zIndex: i,
            }}
          >
            <Carta carta={carta} isFlipped={true} />
          </div>
        ))}
      </div>
      {carte.length > 1 && (
        <div className="text-white text-xs opacity-70">+{carte.length - 1}</div>
      )}
    </div>
  );
}
