import { CardSymbol, Carta, Seme, Valore } from "@/app/types/cards";

export const SEMI: Seme[] = ['Ori', 'Coppe', 'Spade', 'Bastoni'];
export const VALORI: Valore[] = [
    { symbol: 'A', value31: 11, value7: 1 },
    { symbol: '0', value31: 0, value7: 0 },
    { symbol: '2', value31: 2, value7: 2 },
    { symbol: '3', value31: 3, value7: 3 },
    { symbol: '4', value31: 4, value7: 4 },
    { symbol: '5', value31: 5, value7: 5 },
    { symbol: '6', value31: 6, value7: 6 },
    { symbol: '7', value31: 7, value7: 7 },
    { symbol: 'F', value31: 10, value7: 0.5 },
    { symbol: 'C', value31: 10, value7: 0.5 },
    { symbol: 'R', value31: 10, value7: 0.5 }
];

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

export const getPunteggioCarta = (symbol: CardSymbol, type: 'value31' | 'value7' = 'value31'): number => {
    return VALORI.find(valore => valore.symbol == symbol)![type];
};

export const getPunteggioSet = (set: Carta[], type: 'value31' | 'value7' = 'value31'): number => {
    if (!set || set.length === 0) return 0;
    if (type == 'value7'){
        let total=set.reduce((accumulator, currentValue) => accumulator + getPunteggioCarta(currentValue.valore.symbol, 'value7'), 0)
        return total<=7.5?total:0
    }
    let cardsBySeme = SEMI.map(seme => set.filter(carta => carta.seme == seme))
    let scoreBySeme = cardsBySeme.map(cards => cards.reduce((accumulator, currentValue) => accumulator + getPunteggioCarta(currentValue.valore.symbol), 0))
    return Math.max(...scoreBySeme);

};

export const checkSeme = (seme1: Seme, seme2: Seme): boolean => {
    return SEMI.indexOf(seme1) < SEMI.indexOf(seme2)
};

export const checkScore = (carta1: Carta, carta2: Carta, type: 'value31' | 'value7' = 'value31'): boolean => {
    if (getPunteggioCarta(carta2.valore.symbol, type) != getPunteggioCarta(carta1.valore.symbol, type)) return getPunteggioCarta(carta1.valore.symbol, type) > getPunteggioCarta(carta2.valore.symbol, type)
    return checkSeme(carta1.seme, carta2.seme)
};

export const checkScoreSet = (set1: Carta[], set2: Carta[], type: 'value31' | 'value7' = 'value31'): boolean => {
    return getPunteggioSet(set1, type) > getPunteggioSet(set2, type)
};