'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Plate {
  color: 'red' | 'blue';
  hasCookie: boolean;
  showCrumbs: boolean;
}

export default function PlateGame() {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [plates, setPlates] = useState<Plate[]>([
    { color: 'red', hasCookie: true, showCrumbs: false },
    { color: 'blue', hasCookie: true, showCrumbs: false }
  ]);
  const [disappearingPlate, setDisappearingPlate] = useState<'red' | 'blue'>();
  const [gameOver, setGameOver] = useState(false);

  const startNewRound = () => {
    setPlates([
      { color: 'red', hasCookie: true, showCrumbs: false },
      { color: 'blue', hasCookie: true, showCrumbs: false }
    ]);
  };

  const handleCookieClick = (clickedColor: 'red' | 'blue') => {
    if (gameOver) return;

    const newPlates = [...plates];
    const clickedPlate = newPlates.find(p => p.color === clickedColor);
    
    if (clickedPlate && clickedPlate.hasCookie) {
      // Play crunch sound
      const crunchSound = new Audio('/336626__anthousai__shell-crunch-wide-04.wav');
      crunchSound.play();

      // Player gets this cookie
      clickedPlate.hasCookie = false;
      clickedPlate.showCrumbs = true;
      setScore(prev => prev + 1);

      // If they clicked the non-disappearing plate first, remove the other plate's cookie
      if (clickedColor !== disappearingPlate) {
        const otherPlate = newPlates.find(p => p.color !== clickedColor);
        if (otherPlate) {
          otherPlate.hasCookie = false;
          otherPlate.showCrumbs = true;
        }
      }

      setPlates(newPlates);

      // Check if round is complete
      if (!newPlates.some(p => p.hasCookie)) {
        if (round < 10) {
          setRound(prev => prev + 1);
          setTimeout(startNewRound, 2000);
        } else {
          setGameOver(true);
        }
      }
    }
  };

  const restartGame = () => {
    setRound(1);
    setScore(0);
    setGameOver(false);
    setDisappearingPlate(Math.random() < 0.5 ? 'red' : 'blue');
    startNewRound();
  };

  // Start first round and set initial disappearing plate
  useEffect(() => {
    setDisappearingPlate(Math.random() < 0.5 ? 'red' : 'blue');
    startNewRound();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="text-lg">
        Round: {round}/10 | Score: {score}
      </div>
      
      <div className="flex gap-8">
        {plates.map((plate, index) => (
          <div 
            key={plate.color}
            className="relative w-32 h-32 cursor-pointer"
            onClick={() => handleCookieClick(plate.color)}
          >
            <Image
              src={`/Plate${index + 1}.png`}
              alt={`${plate.color} plate`}
              width={128}
              height={128}
              priority
            />
            {plate.hasCookie && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Image
                  src={`/Cookie${index + 1}.png`}
                  alt="Cookie"
                  width={64}
                  height={64}
                  priority
                />
              </div>
            )}
            {plate.showCrumbs && !plate.hasCookie && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Image
                  src={`/Crumbs${index + 1}.png`}
                  alt="Crumbs"
                  width={64}
                  height={64}
                  priority
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {gameOver && (
        <div className="text-xl">
          Game Over! Final Score: {score}
        </div>
      )}

      <button
        onClick={restartGame}
        className="mt-4 px-4 py-2 bg-black/[.03] dark:bg-white/[.05] border border-black/[.08] dark:border-white/[.145] rounded hover:bg-black/[.05] dark:hover:bg-white/[.08]"
      >
        Restart Game
      </button>
    </div>
  );
}
