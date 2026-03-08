'use client';

import { useState, useEffect } from 'react';
import { Carta as CartaType } from './types';
import { generaMazzo } from './deck';
import { Giocatore } from './components/Giocatore';

export default function AppPage() {
  const [mazzoChiuso1, setMazzoChiuso1] = useState<CartaType[]>([]);
  const [mazzoAperto1, setMazzoAperto1] = useState<CartaType[]>([]);
  
  const [mazzoChiuso2, setMazzoChiuso2] = useState<CartaType[]>([]);
  const [mazzoAperto2, setMazzoAperto2] = useState<CartaType[]>([]);

  useEffect(() => {
    setMazzoChiuso1(generaMazzo());
    setMazzoChiuso2(generaMazzo());
  }, []);

  const gioca1 = () => {
    if (mazzoChiuso1.length === 0) return;
    
    const carta = { ...mazzoChiuso1[0], flipped: false };
    setMazzoChiuso1(mazzoChiuso1.slice(1));
    setMazzoAperto1([carta, ...mazzoAperto1]);
  };

  const gioca2 = () => {
    if (mazzoChiuso2.length === 0) return;
    
    const carta = { ...mazzoChiuso2[0], flipped: false };
    setMazzoChiuso2(mazzoChiuso2.slice(1));
    setMazzoAperto2([carta, ...mazzoAperto2]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-900 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <Giocatore
          nome="Giocatore 1"
          mazzoChiuso={mazzoChiuso1}
          mazzoAperto={mazzoAperto1}
          onGioca={gioca1}
        />

        <Giocatore
          nome="Giocatore 2"
          mazzoChiuso={mazzoChiuso2}
          mazzoAperto={mazzoAperto2}
          onGioca={gioca2}
        />
      </div>
    </div>
  );
}
