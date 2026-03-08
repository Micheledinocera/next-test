'use client';

interface GameCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

export function GameCard({ title, description, onClick }: GameCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 rounded-lg p-6 text-white transition-all hover:scale-105 shadow-lg"
    >
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-blue-200">{description}</p>
    </button>
  );
}
