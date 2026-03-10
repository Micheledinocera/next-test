import { create } from "zustand";
import { Carta, Seme, Valore, PlayerDeck } from "../types";

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

export interface GameState {
  playersDecks: PlayerDeck[];
  initDecks: () => void;
  setDrawDeck: (playerIndex: 0 | 1, draw: Carta[]) => void;
  pescaCarta: (playerIndex: 0 | 1) => void;
  pescaPerTutti: () => void;
}

const useGameStore = create<GameState>()((set, get) => ({
  playersDecks: [{ drawDeck: [], shownDeck: [] }, { drawDeck: [], shownDeck: [] }],
  initDecks: () => set((state) => ({
    playersDecks: [
      { drawDeck: generaMazzo(), shownDeck: [] },
      { drawDeck: generaMazzo(), shownDeck: [] }
    ]
  })),
  setDrawDeck: (playerIndex, carte) =>
    set((state) => {
      const nuoviMazzi = [...state.playersDecks];
      nuoviMazzi[playerIndex] = {
        drawDeck: carte,
        shownDeck: []
      };
      return { playersDecks: nuoviMazzi };
    }),
  pescaCarta: (playerIndex) =>
    set((state) => {
      const nuoviMazzi = [...state.playersDecks];
      const mazzoTarget = nuoviMazzi[playerIndex];

      if (mazzoTarget.drawDeck.length > 0) {
        const [primaCarta, ...restanteDrawDeck] = mazzoTarget.drawDeck;

        nuoviMazzi[playerIndex] = {
          drawDeck: restanteDrawDeck,
          shownDeck: [primaCarta, ...mazzoTarget.shownDeck], // Aggiunge in cima alla pila delle mostrate
        };
      }

      return { playersDecks: nuoviMazzi };
    }),

  pescaPerTutti: () =>
    set((state) => {
      const nuoviMazzi = state.playersDecks.map((mazzo) => {
        if (mazzo.drawDeck.length === 0) return mazzo;

        const [primaCarta, ...restanteDrawDeck] = mazzo.drawDeck;
        return {
          drawDeck: restanteDrawDeck,
          shownDeck: [primaCarta, ...mazzo.shownDeck],
        };
      });

      return { playersDecks: nuoviMazzi };
    }),
}))

export const selectIsGameOver = (state: GameState) => {
  return state.playersDecks.some((deck) => deck.drawDeck.length === 0);
};

export default useGameStore