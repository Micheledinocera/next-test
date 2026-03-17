import { create } from "zustand";
import { Carta, PlayerDeck } from "@/app/types/cards";
import { checkScore, generaMazzo } from '@/app/utils/cardUtils';

export interface GameState {
  playersDecks: PlayerDeck[];
  score: number[];
  initDecks: () => void;
  setDrawDeck: (playerIndex: 0 | 1, draw: Carta[]) => void;
  pescaCarta: (playerIndex: 0 | 1) => void;
  pescaPerTutti: (cards?:number) => void;
  calcScore: () => void;
}

const useGameStore = create<GameState>()((set, get) => ({
  playersDecks: [{ drawDeck: [], shownDeck: [] }, { drawDeck: [], shownDeck: [] }],
  score: [0, 0],
  initDecks: () => set(() => ({
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
          shownDeck: [primaCarta, ...mazzoTarget.shownDeck],
        };
      }

      return { playersDecks: nuoviMazzi };
    }),
  pescaPerTutti: (cards:number=1) =>
    set((state) => {
      const nuoviMazzi = state.playersDecks.map((mazzo) => {
        if (mazzo.drawDeck.length === 0) return mazzo;

        const x = 5; // Il numero di carte da pescare

        const primaParte = mazzo.drawDeck.slice(0, cards);
        const restanteDrawDeck = mazzo.drawDeck.slice(cards);
        return {
          drawDeck: restanteDrawDeck,
          shownDeck: [...primaParte, ...mazzo.shownDeck],
        };
      });

      return { playersDecks: nuoviMazzi };
    }),
  calcScore: () => set((state) => {
    let score1 = 0;
    let score2 = 0;
    state.playersDecks[0].shownDeck.forEach((card, cardIndex) => {
      if (checkScore(state.playersDecks[0].shownDeck[cardIndex], state.playersDecks[1].shownDeck[cardIndex])) score1++
      else score2++
    })
    return { score: [score1, score2] }
  })
}))

export const selectIsGameOver = (state: GameState) => {
  return state.playersDecks.some((deck) => deck.drawDeck.length === 0);
};

export default useGameStore