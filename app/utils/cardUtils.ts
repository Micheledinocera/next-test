import { Carta, Seme, Valore } from "@/app/types/cards";

export const SEMI: Seme[] = ['Ori', 'Coppe', 'Spade', 'Bastoni'];
export const VALORI: Valore[] = ['A', '2', '3', '4', '5', '6', '7', 'F', 'C', 'R'];

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

export const getPunteggioCarta = (valore: Valore): number => {
    const mapping: Record<Valore, number> = {
        'A': 11, 'F': 10, 'C': 10, 'R': 10, '7': 7, '6': 6, '5': 5, '4': 4, '3': 3, '2': 2
    };
    return mapping[valore] || 0;
};

export const checkSeme = (seme1: Seme, seme2: Seme): boolean => {
    return SEMI.indexOf(seme1) < SEMI.indexOf(seme2)
};

export const checkScore = (carta1: Carta, carta2: Carta): boolean => {
    if(getPunteggioCarta(carta2.valore) != getPunteggioCarta(carta1.valore)) return getPunteggioCarta(carta1.valore) > getPunteggioCarta(carta2.valore)
    return checkSeme(carta1.seme, carta2.seme)
}