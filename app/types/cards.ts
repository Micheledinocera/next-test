export type Seme = 'Ori' | 'Coppe' | 'Spade' | 'Bastoni';
export type Valore = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | 'F' | 'C' | 'R';

export interface Carta {
  id: string;
  valore: Valore;
  seme: Seme;
  flipped: boolean;
}

export interface PlayerDeck{
  drawDeck: Carta[],
  shownDeck: Carta[]
}
