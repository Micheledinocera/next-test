'use client';

import { Carta as CartaType } from '../types';
import { MazzoVisivo } from './MazzoVisivo';

interface GiocatoreProps {
  nome: string;
  mazzoChiuso: CartaType[];
  mazzoAperto: CartaType[];
  onGioca: () => void;
}

export function Giocatore({ nome, mazzoChiuso, mazzoAperto, onGioca }: GiocatoreProps) {
  return (
    <div className="bg-green-700 bg-opacity-50 rounded-lg p-6">
      <h2 className="text-white text-2xl font-bold mb-4">{nome}</h2>

      <div className="flex justify-around mb-6">
        <MazzoVisivo carte={mazzoChiuso} label={`Mazzo (${mazzoChiuso.length})`} />
        <MazzoVisivo carte={mazzoAperto} label={`Scoperte (${mazzoAperto.length})`} />
      </div>

      <button
        onClick={onGioca}
        disabled={mazzoChiuso.length === 0}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        {mazzoChiuso.length > 0 ? 'Gioca' : 'Mazzo Vuoto'}
      </button>
    </div>
  );
}
