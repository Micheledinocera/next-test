'use client';

import { Carta as CartaType } from '@/app/types';
import { MazzoVisivo } from './MazzoVisivo';

interface GiocatoreProps {
  nome: string;
  mazzoChiuso: CartaType[];
}

export function Giocatore({ nome, mazzoChiuso }: GiocatoreProps) {
  return (
    <div className="bg-green-700 bg-opacity-50 rounded-lg p-6">
      <h2 className="text-white text-2xl font-bold mb-4">{nome}</h2>

      <div className="flex justify-around mb-6">
        <MazzoVisivo carte={mazzoChiuso} label={`Mazzo (${mazzoChiuso.length})`} />
      </div>

    </div>
  );
}
