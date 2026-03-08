import { Seme, Valore, Carta } from './types';

export const SEMI: Seme[] = ['Ori', 'Coppe', 'Spade', 'Bastoni'];
export const VALORI: Valore[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export const SIMBOLI_SEME: Record<Seme, string> = {
  Ori: '♦',
  Coppe: '♥',
  Spade: '♠',
  Bastoni: '♣',
};

export const COLORI_SEME: Record<Seme, string> = {
  Ori: 'text-yellow-600',
  Coppe: 'text-red-600',
  Spade: 'text-black',
  Bastoni: 'text-green-700',
};

/**
 * Genera un mazzo completo di 40 carte napoletane
 * (senza 8, 9, 10 in alcuni giochi, ma qui includiamo tutto)
 */
export function generaMazzo(): Carta[] {
  const carte: Carta[] = [];
  let id = 0;

  for (const seme of SEMI) {
    for (const valore of VALORI) {
      carte.push({
        id: `${seme}-${valore}-${id}`,
        valore,
        seme,
        flipped: true, // Inizialmente coperta
      });
      id++;
    }
  }

  // Mescola il mazzo
  return mescolaMazzo(carte);
}

/**
 * Mescola il mazzo usando l'algoritmo Fisher-Yates
 */
export function mescolaMazzo(carte: Carta[]): Carta[] {
  const mescolate = [...carte];
  
  for (let i = mescolate.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mescolate[i], mescolate[j]] = [mescolate[j], mescolate[i]];
  }
  
  return mescolate;
}

/**
 * Divide il mazzo tra due giocatori
 */
export function divideMazzo(mazzo: Carta[]): { mazzo1: Carta[]; mazzo2: Carta[] } {
  const metà = Math.floor(mazzo.length / 2);
  return {
    mazzo1: mazzo.slice(0, metà),
    mazzo2: mazzo.slice(metà),
  };
}
