// Game demonstrating the ability of a fish species to remember the topography of its environment,
// and use that memory to jump between puddles based solely off of memory.

'use client';

import { useEffect, useRef, useState } from 'react';

interface Puddle {
  x: number;
  y: number;
  radius: number;
  isStart?: boolean;
  pondImage?: number; // Index of the pond SVG to use (1-6)
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
  ROTATING = 'rotating',
  PLAYING = 'playing',
  WON = 'won',
  LOST = 'lost',
}

const MEMORIZATION_TIME = 5000; // 5 seconds
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const PUDDLE_COUNT = 5;
const PUDDLE_RADIUS = 40; // Increased to match SVG size better
const START_PUDDLE_RADIUS = 55; // Larger starting puddle
const FISH_SIZE = 20; // Adjusted for sprite size
const FADE_DURATION = 500; // Duration of fade transition in ms

// Add pond images array
const pondImages = [
  '/Pond1.svg',
  '/Pond2.svg',
  '/Pond3.svg',
  '/Pond4.svg',
  '/Pond5.svg',
  '/Pond6.svg'
];

export default function FishJump() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const successSoundRef = useRef<HTMLAudioElement | null>(null);
  const failureSoundRef = useRef<HTMLAudioElement | null>(null);
  const [gameState, setGameState] = useState<GameState>(GameState.READY);
  const [puddles, setPuddles] = useState<Puddle[]>([]);
  const [fish, setFish] = useState<Fish | null>(null);
  const [timeLeft, setTimeLeft] = useState(MEMORIZATION_TIME / 1000);
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [startPuddlePos, setStartPuddlePos] = useState<{x: number, y: number} | null>(null);
  const [showAllPuddles, setShowAllPuddles] = useState(true);
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);
  const [centralPool, setCentralPool] = useState<HTMLImageElement | null>(null);
  const [fishSprite, setFishSprite] = useState<HTMLImageElement | null>(null);
  const [rockSprite, setRockSprite] = useState<HTMLImageElement | null>(null);
  const [seaweedSprite, setSeaweedSprite] = useState<HTMLImageElement | null>(null);
  const [fadeOpacity, setFadeOpacity] = useState(0);

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
            // Start rotation transition
            setGameState(GameState.ROTATING);
            setFadeOpacity(1);
            
            // After fade to black, set rotation and start fade out
            setTimeout(() => {
              const randomRotation = Math.random() * Math.PI * 2;
              setRotationAngle(randomRotation);
              setShowAllPuddles(false);
              setFadeOpacity(0);
              
              // After fade out complete, start playing
              setTimeout(() => {
                setGameState(GameState.PLAYING);
              }, FADE_DURATION);
            }, FADE_DURATION);
            
            return MEMORIZATION_TIME / 1000;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  // Load pond images and central pool
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    pondImages.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        images[index] = img;
        loadedCount++;
        if (loadedCount === pondImages.length) {
          setLoadedImages(images);
        }
      };
    });

    const centralPoolImg = new Image();
    centralPoolImg.src = '/CentralPool.png';
    centralPoolImg.onload = () => {
      setCentralPool(centralPoolImg);
    };

    const fishImg = new Image();
    fishImg.src = '/FishSprite.svg';
    fishImg.onload = () => {
      setFishSprite(fishImg);
    };

    const rockImg = new Image();
    rockImg.src = '/Rocks.svg';
    rockImg.onload = () => {
      setRockSprite(rockImg);
    };

    const seaweedImg = new Image();
    seaweedImg.src = '/Seaweed.svg';
    seaweedImg.onload = () => {
      setSeaweedSprite(seaweedImg);
    };
  }, []);

  // Initialize audio elements
  useEffect(() => {
    successSoundRef.current = new Audio('/water-splash.wav');
    failureSoundRef.current = new Audio('/plop.wav');
  }, []);

  // Generate random puddles and place fish
  const generateGame = () => {
    const newPuddles: Puddle[] = [];
    
    // Start with center puddle
    const centerPuddle = {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      radius: START_PUDDLE_RADIUS,
      isStart: true
    };
    newPuddles.push(centerPuddle);
    setStartPuddlePos({x: centerPuddle.x, y: centerPuddle.y});

    // Generate other puddles
    for (let i = 0; i < PUDDLE_COUNT - 1; i++) {
      let valid = false;
      let attempts = 0;
      while (!valid && attempts < 100) {
        const puddle = {
          x: Math.random() * (CANVAS_WIDTH - 2 * PUDDLE_RADIUS) + PUDDLE_RADIUS,
          y: Math.random() * (CANVAS_HEIGHT - 2 * PUDDLE_RADIUS) + PUDDLE_RADIUS,
          radius: PUDDLE_RADIUS,
          pondImage: i % 6 // Assign a random pond image (0-5)
        };
        valid = !newPuddles.some(
          (p) =>
            Math.hypot(p.x - puddle.x, p.y - puddle.y) < PUDDLE_RADIUS * 3
        );
        if (valid) newPuddles.push(puddle);
        attempts++;
      }
    }

    // Generate random positions for landmarks within the central puddle
    const getRandomPointInPuddle = () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * (START_PUDDLE_RADIUS * 0.7); // 0.7 to keep landmarks away from edge
      return {
        x: centerPuddle.x + radius * Math.cos(angle),
        y: centerPuddle.y + radius * Math.sin(angle)
      };
    };

    const rockPos = getRandomPointInPuddle();
    const plantPos = getRandomPointInPuddle();

    // Generate landmarks for starting puddle with random positions
    const newLandmarks: Landmark[] = [
      {
        x: rockPos.x,
        y: rockPos.y,
        type: 'rock'
      },
      {
        x: plantPos.x,
        y: plantPos.y,
        type: 'plant'
      }
    ];
    
    setPuddles(newPuddles);
    setLandmarks(newLandmarks);
    setFish({
      x: centerPuddle.x,
      y: centerPuddle.y,
      rotation: Math.random() * Math.PI * 2,
    });
    setShowAllPuddles(true);
  };

  // Handle canvas click
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState !== GameState.PLAYING) return;

    const canvas = canvasRef.current;
    if (!canvas || !fish || !startPuddlePos) return;

    const rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // Reverse rotate the click coordinates to match the rotated world
    const rotatedX = Math.cos(-rotationAngle) * (x - startPuddlePos.x) - 
                     Math.sin(-rotationAngle) * (y - startPuddlePos.y) + startPuddlePos.x;
    const rotatedY = Math.sin(-rotationAngle) * (x - startPuddlePos.x) + 
                     Math.cos(-rotationAngle) * (y - startPuddlePos.y) + startPuddlePos.y;

    // Check if click is on a puddle (excluding current puddle)
    const clickedPuddle = puddles.find(
      (p) =>
        Math.hypot(p.x - rotatedX, p.y - rotatedY) < p.radius &&
        (p.x !== fish.x || p.y !== fish.y)
    );

    // Show all puddles after click
    setShowAllPuddles(true);

    if (clickedPuddle) {
      // Play success sound
      successSoundRef.current?.play().catch(console.error);
      
      setFish({
        x: clickedPuddle.x,
        y: clickedPuddle.y,
        rotation: Math.atan2(clickedPuddle.y - fish.y, clickedPuddle.x - fish.x),
      });
      setGameState(GameState.WON);
    } else {
      // Play failure sound
      failureSoundRef.current?.play().catch(console.error);
      
      // Move fish to clicked location
      setFish({
        x: rotatedX,
        y: rotatedY,
        rotation: Math.atan2(rotatedY - fish.y, rotatedX - fish.x),
      });
      
      setGameState(GameState.LOST);
    }
  };

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !fish || !startPuddlePos || loadedImages.length < 6 || !centralPool || !fishSprite || !rockSprite || !seaweedSprite) return;

    // Fill background with light blue if not rotated, tan if rotated
    ctx.fillStyle = (gameState === GameState.READY || gameState === GameState.MEMORIZE) ? '#5b97f0' : '#ba975f';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Save the context state before any transformations
    ctx.save();

    // Always apply rotation if not in READY or MEMORIZE state
    if (gameState !== GameState.READY && gameState !== GameState.MEMORIZE) {
      ctx.translate(startPuddlePos.x, startPuddlePos.y);
      ctx.rotate(rotationAngle);
      ctx.translate(-startPuddlePos.x, -startPuddlePos.y);
    }

    // Draw puddles
    puddles.forEach((puddle) => {
      // Only draw non-start puddles if showAllPuddles is true
      if (puddle.isStart || showAllPuddles) {
        if (puddle.isStart) {
          // Draw central pool using SVG
          const size = puddle.radius * 2;
          ctx.drawImage(centralPool, puddle.x - size/2, puddle.y - size/2, size, size);

          // Draw landmarks
          landmarks.forEach(landmark => {
            const landmarkSize = 16;
            if (landmark.type === 'rock') {
              ctx.drawImage(rockSprite, landmark.x - landmarkSize/2, landmark.y - landmarkSize/2, landmarkSize, landmarkSize);
            } else {
              ctx.drawImage(seaweedSprite, landmark.x - landmarkSize/2, landmark.y - landmarkSize/2, landmarkSize, landmarkSize * 2);
            }
          });
        } else if (typeof puddle.pondImage === 'number' && loadedImages[puddle.pondImage]) {
          // Draw SVG pond
          const img = loadedImages[puddle.pondImage];
          const size = puddle.radius * 2;
          ctx.drawImage(img, puddle.x - size/2, puddle.y - size/2, size, size);
        }
      }
    });

    // Draw fish
    ctx.save();
    ctx.translate(fish.x, fish.y);
    ctx.rotate(fish.rotation);
    ctx.drawImage(fishSprite, -FISH_SIZE, -FISH_SIZE, FISH_SIZE * 2, FISH_SIZE * 2);
    ctx.restore();

    // Restore context to remove rotation
    ctx.restore();

  }, [gameState, puddles, fish, landmarks, rotationAngle, startPuddlePos, showAllPuddles, loadedImages, centralPool, fishSprite, rockSprite, seaweedSprite]);

  const startGame = () => {
    setGameState(GameState.MEMORIZE);
    setTimeLeft(MEMORIZATION_TIME / 1000);
    setRotationAngle(0);
    setShowAllPuddles(true);
  };

  const resetGame = () => {
    setGameState(GameState.READY);
    setRotationAngle(0);
    setShowAllPuddles(true);
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
        <div 
          className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-500"
          style={{ opacity: fadeOpacity }}
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
      <div className="text-gray-200 max-w-md text-center">
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