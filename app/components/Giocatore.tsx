'use client';

import { Carta as CartaType } from '@/app/types/cards';
import { MazzoVisivo } from './MazzoVisivo';
import useGameStore from '@/app/store/useGameStore';

interface GiocatoreProps {
  nome: string;
  mazzoChiuso: CartaType[];
  index:number;
}

export function Giocatore({ nome, mazzoChiuso,index }: GiocatoreProps) {
  const gameStore = useGameStore();
  
  return (
    <div className="bg-green-700 bg-opacity-50 rounded-lg p-6">
      <h2 className="text-white text-2xl font-bold mb-4">{nome} : {gameStore.score[index]} 
        { gameStore.score[index]>gameStore.score[(index+1)%2]?
          <span>👑</span>:null
        }
      </h2> 

      <div className="flex justify-around mb-6">
        <MazzoVisivo carte={mazzoChiuso} label={`Mazzo (${mazzoChiuso.length})`} />
      </div>

    </div>
  );
}
