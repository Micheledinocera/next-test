'use client';

import { Carta as CartaType } from '../types';
import { Carta } from './Carta';

interface MazzoProps {
  carte: CartaType[];
  cartaFlipped: boolean;
}

export function Mazzo({ carte, cartaFlipped }: MazzoProps) {
  if (carte.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-white text-sm font-semibold">Mazzo ({carte.length})</div>
      <Carta carta={carte[0]} isFlipped={cartaFlipped} />
    </div>
  );
}
