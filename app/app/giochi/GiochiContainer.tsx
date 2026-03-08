'use client';

import { Gioco1 } from './Gioco1';
import { Gioco2 } from './Gioco2';

interface GiochiContainerProps {
  gioco: 'gioco1' | 'gioco2';
}

export function GiochiContainer({ gioco }: GiochiContainerProps) {
  return (
    <div>
      {gioco === 'gioco1' && <Gioco1 />}
      {gioco === 'gioco2' && <Gioco2 />}
    </div>
  );
}
