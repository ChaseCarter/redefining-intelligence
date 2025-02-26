// Game demonstrating the ability of a fish species to remember the topography of its environment,
// and use that memory to jump between puddles based solely off of memory.

'use client';

import { useEffect, useRef, useState } from 'react';

interface Puddle {
  x: number;
  y: number;
  radius: number;
  isStart?: boolean;
}

interface Fish {
  x: number;
  y: number;
  rotation: number;
}

interface Landmark {
  x: number;
  y: number;
  type: 'rock' | 'plant';
}

enum GameState {
  READY = 'ready',
  MEMORIZE = 'memorize',
  PLAYING = 'playing',
  WON = 'won',
  LOST = 'lost',
}

const MEMORIZATION_TIME = 5000; // 5 seconds
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const PUDDLE_COUNT = 5;
const PUDDLE_RADIUS = 30;
const START_PUDDLE_RADIUS = 45; // Larger starting puddle
const FISH_SIZE = 15;

export default function FishJump() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>(GameState.READY);
  const [puddles, setPuddles] = useState<Puddle[]>([]);
  const [fish, setFish] = useState<Fish | null>(null);
  const [timeLeft, setTimeLeft] = useState(MEMORIZATION_TIME / 1000);
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);

  // Initialize game
  useEffect(() => {
    if (gameState === GameState.READY) {
      generateGame();
    }
  }, [gameState]);

  // Timer for memorization phase
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === GameState.MEMORIZE) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameState(GameState.PLAYING);
            return MEMORIZATION_TIME / 1000;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  // Generate random puddles and place fish
  const generateGame = () => {
    const newPuddles: Puddle[] = [];
    for (let i = 0; i < PUDDLE_COUNT; i++) {
      let valid = false;
      let attempts = 0;
      while (!valid && attempts < 100) {
        const puddle = {
          x: Math.random() * (CANVAS_WIDTH - 2 * PUDDLE_RADIUS) + PUDDLE_RADIUS,
          y: Math.random() * (CANVAS_HEIGHT - 2 * PUDDLE_RADIUS) + PUDDLE_RADIUS,
          radius: PUDDLE_RADIUS,
        };
        valid = !newPuddles.some(
          (p) =>
            Math.hypot(p.x - puddle.x, p.y - puddle.y) < PUDDLE_RADIUS * 3
        );
        if (valid) newPuddles.push(puddle);
        attempts++;
      }
    }
    
    const startPuddle = newPuddles[Math.floor(Math.random() * newPuddles.length)];
    startPuddle.radius = START_PUDDLE_RADIUS;
    startPuddle.isStart = true;

    // Generate landmarks for starting puddle
    const newLandmarks: Landmark[] = [
      {
        x: startPuddle.x - START_PUDDLE_RADIUS/2,
        y: startPuddle.y - START_PUDDLE_RADIUS/2,
        type: 'rock'
      },
      {
        x: startPuddle.x + START_PUDDLE_RADIUS/2,
        y: startPuddle.y + START_PUDDLE_RADIUS/2,
        type: 'plant'
      }
    ];
    
    setPuddles(newPuddles);
    setLandmarks(newLandmarks);
    setFish({
      x: startPuddle.x,
      y: startPuddle.y,
      rotation: Math.random() * Math.PI * 2,
    });
  };

  // Handle canvas click
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState !== GameState.PLAYING) return;

    const canvas = canvasRef.current;
    if (!canvas || !fish) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if click is on a puddle (excluding current puddle)
    const clickedPuddle = puddles.find(
      (p) =>
        Math.hypot(p.x - x, p.y - y) < p.radius &&
        (p.x !== fish.x || p.y !== fish.y)
    );

    if (clickedPuddle) {
      setFish({
        x: clickedPuddle.x,
        y: clickedPuddle.y,
        rotation: Math.atan2(clickedPuddle.y - fish.y, clickedPuddle.x - fish.x),
      });
      setGameState(GameState.WON);
    } else {
      setGameState(GameState.LOST);
    }
  };

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !fish) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw puddles
    puddles.forEach((puddle) => {
      if (
        gameState === GameState.MEMORIZE ||
        gameState === GameState.READY ||
        Math.hypot(puddle.x - fish.x, puddle.y - fish.y) < puddle.radius ||
        gameState === GameState.WON ||
        gameState === GameState.LOST
      ) {
        ctx.beginPath();
        ctx.arc(puddle.x, puddle.y, puddle.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#4a90e2';
        ctx.fill();

        // Draw landmarks if this is the start puddle
        if (puddle.isStart) {
          landmarks.forEach(landmark => {
            ctx.beginPath();
            if (landmark.type === 'rock') {
              ctx.fillStyle = '#808080';
              ctx.arc(landmark.x, landmark.y, 8, 0, Math.PI * 2);
            } else {
              ctx.fillStyle = '#2ecc71';
              ctx.fillRect(landmark.x - 4, landmark.y - 8, 8, 16);
            }
            ctx.fill();
          });
        }
      }
    });

    // Draw fish
    ctx.save();
    ctx.translate(fish.x, fish.y);
    ctx.rotate(fish.rotation);
    ctx.beginPath();
    ctx.moveTo(FISH_SIZE, 0);
    ctx.lineTo(-FISH_SIZE, FISH_SIZE / 2);
    ctx.lineTo(-FISH_SIZE, -FISH_SIZE / 2);
    ctx.closePath();
    ctx.fillStyle = '#f39c12';
    ctx.fill();
    ctx.restore();

    // Draw fog of war
    if (gameState === GameState.PLAYING) {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = '#333';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.globalCompositeOperation = 'source-over';
      ctx.beginPath();
      const currentPuddle = puddles.find(p => p.x === fish.x && p.y === fish.y);
      const visibilityRadius = currentPuddle?.radius || PUDDLE_RADIUS;
      ctx.arc(fish.x, fish.y, visibilityRadius, 0, Math.PI * 2);
      ctx.clip();
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.restore();
    }
  }, [gameState, puddles, fish, landmarks]);

  const startGame = () => {
    setGameState(GameState.MEMORIZE);
    setTimeLeft(MEMORIZATION_TIME / 1000);
  };

  const resetGame = () => {
    setGameState(GameState.READY);
    generateGame();
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold mb-4">Fish Jump Memory Game</h1>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onClick={handleClick}
          className="border-2 border-gray-300 rounded-lg"
        />
        {gameState === GameState.MEMORIZE && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/75 text-white px-4 py-2 rounded">
            Memorize in: {timeLeft}s
          </div>
        )}
        {(gameState === GameState.WON || gameState === GameState.LOST) && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/75 text-white px-4 py-2 rounded">
            {gameState === GameState.WON ? 'You Won!' : 'Game Over!'}
          </div>
        )}
      </div>
      <div className="flex gap-4">
        {gameState === GameState.READY && (
          <button
            onClick={startGame}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Start Game
          </button>
        )}
        {(gameState === GameState.WON || gameState === GameState.LOST) && (
          <button
            onClick={resetGame}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Play Again
          </button>
        )}
      </div>
      <div className="text-gray-600 max-w-md text-center">
        <p>
          {gameState === GameState.READY
            ? 'Press Start to begin! Memorize the puddle locations.'
            : gameState === GameState.MEMORIZE
            ? 'Memorize the puddle locations!'
            : gameState === GameState.PLAYING
            ? 'Click on a puddle to make the fish jump!'
            : ''}
        </p>
      </div>
    </div>
  );
}