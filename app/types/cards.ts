export type Seme = 'Ori' | 'Coppe' | 'Spade' | 'Bastoni';
export type CardSymbol = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | 'F' | 'C' | 'R';

export interface Valore {
  symbol: CardSymbol;
  value31: number,
  value7: number
}
export interface Carta {
  id: string;
  valore: Valore;
  seme: Seme;
  flipped: boolean;
}

export interface PlayerDeck {
  drawDeck: Carta[],
  shownDeck: Carta[]
}
