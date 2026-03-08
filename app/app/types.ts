export type Seme = 'Ori' | 'Coppe' | 'Spade' | 'Bastoni';
export type Valore = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Carta {
  id: string;
  valore: Valore;
  seme: Seme;
  flipped: boolean;
}

export interface GameState {
  mazzoGiocatore1: Carta[];
  mazzoGiocatore2: Carta[];
  cartaAttiva: {
    giocatore1?: Carta;
    giocatore2?: Carta;
  };
}
