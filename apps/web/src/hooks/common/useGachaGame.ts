'use client';
import { useEffect, useState } from 'react';

import { prizes } from '@/lib/constants/game';
import { Ball, ConfettiParticle, Prize } from '@/lib/types';

export const useGachaGame = () => {
  const [gameState, setGameState] = useState<'init' | 'ready' | 'playing' | 'complete'>('init');
  const [balls, setBalls] = useState<Ball[]>([]);
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiParticles, setConfettiParticles] = useState<ConfettiParticle[]>([]);
  const [isJittering, setIsJittering] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showHint2, setShowHint2] = useState(false);

  // 볼 생성
  const createBalls = (): Ball[] => {
    const ballPositions = [
      { x: 0.5, y: 0.6 },
      { x: 0, y: 0.68 },
      { x: 0.22, y: 0.65 },
      { x: 0.7, y: 0.63 },
      { x: 0.96, y: 0.66 },
      { x: 0.75, y: 0.79 },
      { x: 0.5, y: 0.8 },
      { x: 0.9, y: 0.81 }, // 상품 볼
      { x: 0, y: 0.82 },
      { x: 1, y: 0.9 },
      { x: 0.25, y: 0.85 },
      { x: 0.9, y: 1 },
      { x: 0.4, y: 1 },
      { x: 0.65, y: 1 },
      { x: 0.09, y: 1 },
    ];

    return ballPositions.map((pos, index) => ({
      id: index,
      x: pos.x,
      y: pos.y,
      rotate: Math.floor(Math.random() * 360),
      hue: Math.floor(Math.random() * 360),
      size: 8,
      isPrize: index === 7,
    }));
  };

  // 컨페티 생성
  const createConfetti = () => {
    const particles: ConfettiParticle[] = [];
    for (let i = 0; i < 128; i++) {
      particles.push({
        id: i,
        x: 50 + (Math.random() * 12 - 6),
        y: 50 + (Math.random() * 12 - 6),
        speedX: Math.random() * 1.5 - 0.75,
        speedY: -0.5 + Math.random() * 2 - 1,
        size: 8 + Math.random() * 8 - 4,
        color: `hsl(${Math.random() * 360}deg, 80%, 60%)`,
        rx: Math.random() * 2 - 1,
        ry: Math.random() * 2 - 1,
        rz: Math.random() * 2 - 1,
        rs: Math.random() * 2 + 0.5,
      });
    }
    setConfettiParticles(particles);
    setShowConfetti(true);

    setTimeout(() => {
      setShowConfetti(false);
      setConfettiParticles([]);
    }, 3000);
  };

  // 핸들 클릭
  const handleClick = () => {
    if (gameState !== 'ready') return;

    setGameState('playing');
    setShowHint(false);
    setIsJittering(true);

    setTimeout(() => {
      setIsJittering(false);
      setTimeout(() => {
        setShowHint2(true);
      }, 2000);
    }, 2000);
  };

  // 상품 볼 클릭
  const handlePrizeBallClick = () => {
    if (gameState !== 'playing') return;

    setShowHint2(false);
    setGameState('complete');
    createConfetti();
  };

  // 게임 초기화
  useEffect(() => {
    const getRandomPrize = (): Prize => {
      return prizes[Math.floor(Math.random() * prizes.length)] as Prize;
    };

    const newBalls = createBalls();
    setBalls(newBalls);
    setSelectedPrize(getRandomPrize());

    setTimeout(() => {
      setGameState('ready');
      setTimeout(() => setShowHint(true), 2000);
    }, 1000);
  }, []);

  return {
    gameState,
    balls,
    selectedPrize,
    showConfetti,
    confettiParticles,
    isJittering,
    showHint,
    showHint2,
    handleClick,
    handlePrizeBallClick,
  };
};
