'use client';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { AnimatePresence, motion } from 'motion/react';

// 타입 정의
interface Ball {
  id: number;
  x: number;
  y: number;
  rotate: number;
  hue: number;
  size: number;
}

interface Prize {
  image: string;
  title: string;
}

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  color: string;
  rx: number;
  ry: number;
  rz: number;
  rs: number;
}

const prizes: Prize[] = [
  {
    image: 'https://assets.codepen.io/2509128/prize1.png',
    title: '토끼 인형',
  },
  {
    image: 'https://assets.codepen.io/2509128/prize2.png',
    title: '테디베어',
  },
  {
    image: 'https://assets.codepen.io/2509128/prize3.png',
    title: '북극곰',
  },
  {
    image: 'https://assets.codepen.io/2509128/prize4.png',
    title: '북극곰 신부',
  },
];

// 갓챠 게임 컴포넌트
const GachaGame: React.FC = () => {
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

    // 3초 후 컨페티 제거
    setTimeout(() => {
      setShowConfetti(false);
      setConfettiParticles([]);
    }, 3000);
  };

  // 게임 초기화
  useEffect(() => {
    // 랜덤 상품 선택 함수를 useEffect 내부로 이동
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

  // 핸들 클릭
  const handleClick = async () => {
    if (gameState !== 'ready') return;

    setGameState('playing');
    setShowHint(false);
    setIsJittering(true);

    // 2초 후 지터링 중지하고 볼 떨어뜨리기
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

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-600">
      {/* 배경 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(https://assets.codepen.io/2509128/bg.jpg)' }}
      />

      {/* 컨페티 */}
      <AnimatePresence>
        {showConfetti && (
          <div className="pointer-events-none absolute inset-0 z-50">
            {confettiParticles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute"
                style={{
                  backgroundColor: particle.color,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  borderRadius: '50%',
                }}
                initial={{
                  x: `${particle.x}vw`,
                  y: `${particle.y}vh`,
                  scale: 0,
                }}
                animate={{
                  x: `${particle.x + particle.speedX * 100}vw`,
                  y: `${particle.y + particle.speedY * 100 + 100}vh`,
                  scale: 1,
                  rotate: 360 * particle.rs,
                }}
                transition={{
                  duration: 3,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* 게임 영역 */}
      <div
        className={`relative flex h-full w-full items-center justify-center transition-all duration-500 ${
          gameState === 'complete' ? 'brightness-60 saturate-75' : ''
        }`}
      >
        {/* 머신 컨테이너 */}
        <motion.div
          className="relative"
          initial={{ y: '100vh' }}
          animate={{
            y: gameState === 'init' ? '100vh' : gameState === 'complete' ? '100vh' : '0vh',
            x: isJittering ? [0, 2, 0, -2, 0] : 0,
          }}
          transition={{
            y: { duration: 0.6, ease: 'easeInOut' },
            x: { duration: 0.1, repeat: isJittering ? Infinity : 0 },
          }}
        >
          {/* 백보드 */}
          <div
            className="absolute z-0 bg-pink-400"
            style={{
              width: '15vh',
              height: '13vh',
              top: '65%',
              left: '48%',
            }}
          />

          {/* 볼들 */}
          <div
            className="absolute"
            style={{
              top: '22%',
              left: '18%',
              width: '64%',
              height: '35.5%',
            }}
          >
            {balls.map((ball, index) => (
              <motion.div
                key={ball.id}
                className="absolute cursor-pointer overflow-hidden rounded-full border-8"
                style={{
                  width: `${ball.size}vh`,
                  height: `${ball.size}vh`,
                  left: `calc(${ball.x} * (100% - ${ball.size}vh))`,
                  top: `calc(${ball.y} * (100% - ${ball.size}vh))`,
                  backgroundColor: `hsl(${ball.hue}deg, 80%, 70%)`,
                  borderColor: `hsl(${ball.hue}deg, 50%, 55%)`,
                  transform: `rotate(${ball.rotate}deg)`,
                }}
                animate={{
                  y: isJittering
                    ? [0, -(Math.random() * 6 + 2), 0]
                    : index === 7 && gameState === 'playing'
                      ? ['0vh', '12vh', '23vh', '22vh', '23vh', '22.5vh', '23vh']
                      : 0,
                  x: isJittering
                    ? [0, Math.random() * 4 - 2, 0]
                    : index === 7 && gameState === 'playing'
                      ? '-3vh'
                      : 0,
                  rotate: ball.rotate + (isJittering ? Math.random() * 10 - 5 : 0),
                }}
                transition={{
                  duration: isJittering
                    ? Math.random() * 0.1 + 0.05
                    : index === 7 && gameState === 'playing'
                      ? 2.5
                      : 0,
                  repeat: isJittering ? Infinity : 0,
                  delay: isJittering ? -index * 0.0613 : 0,
                }}
                onClick={() => index === 7 && handlePrizeBallClick()}
              >
                {/* 볼 내부 그라데이션 */}
                <div
                  className="absolute h-full w-full rounded-full"
                  style={{
                    backgroundColor: `hsl(${ball.hue + 20}deg, 50%, 90%)`,
                    transform: 'translate(-25%, -5%) scale(2)',
                    border: 'inherit',
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* 머신 이미지 */}
          <Image
            className="pointer-events-none relative z-10 max-h-[80vh]"
            src="https://assets.codepen.io/2509128/gotcha.svg"
            alt="갓챠 머신"
            width={800}
            height={800}
          />

          {/* 타이틀 */}
          <div
            className="absolute z-30 w-full text-center text-5xl font-bold text-white"
            style={{
              top: '10%',
              textShadow:
                '0px 0px 2px #ad8bd6, 0px 0px 2px #ad8bd6, 0px 0px 2px #ad8bd6, 0px 0px 2px #ad8bd6',
              filter: 'drop-shadow(0px 2px 0px rgba(0, 0, 0, 0.2))',
            }}
          >
            {'하루한번!!'.split('').map((char, index) => (
              <motion.span
                key={index}
                animate={{
                  color: ['#ffc7e5', '#fcff33', '#ffc7e5'],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: index * 0.12,
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* 가격 */}
          <div className="absolute z-30 text-3xl text-pink-400" style={{ top: '81%', left: '26%' }}>
            1/day
          </div>

          {/* 핸들 */}
          <motion.img
            className="absolute z-30 cursor-pointer"
            style={{
              height: '3.9vh',
              left: '25%',
              top: '69%',
            }}
            src="https://assets.codepen.io/2509128/handle.svg"
            onClick={handleClick}
            animate={{
              rotate: gameState === 'playing' ? [0, 90, 0] : 0,
            }}
            transition={{
              duration: gameState === 'playing' ? 2.3 : 0,
              times: [0, 0.13, 1],
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />

          {/* 포인터 (힌트) */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                className="pointer-events-none absolute z-50"
                style={{
                  height: '10vh',
                  top: '75%',
                  left: '25%',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <motion.img
                  src="https://assets.codepen.io/2509128/point.png"
                  className="block h-full"
                  style={{
                    transform: 'rotate(-30deg)',
                    transformOrigin: '0% 0%',
                  }}
                  animate={{
                    y: [0, '5vh', 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
            )}
            {showHint2 && (
              <motion.div
                className="pointer-events-none absolute z-50"
                style={{
                  height: '10vh',
                  top: '83%',
                  left: '56%',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <motion.img
                  src="https://assets.codepen.io/2509128/point.png"
                  className="block h-full"
                  style={{
                    transform: 'rotate(-30deg)',
                    transformOrigin: '0% 0%',
                  }}
                  animate={{
                    y: [0, '5vh', 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* UI 레이어 */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {/* 타이틀 힌트 */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              className="flex h-full w-full items-end justify-center pb-20"
              initial={{ y: '120vh' }}
              animate={{ y: 0 }}
              exit={{ y: '120vh' }}
              transition={{ duration: 1, ease: 'backOut' }}
            >
              <motion.h2
                className="text-center text-5xl font-bold text-white"
                style={{
                  textShadow: '0px 0px 2px #f06e5b, 0px 0px 2px #f06e5b, 0px 0px 2px #f06e5b',
                  filter: 'drop-shadow(0px 2px 0px rgba(0, 0, 0, 0.2))',
                }}
                animate={{
                  rotate: [-5, 5, -5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                Tap to get a prize!
              </motion.h2>
            </motion.div>
          )}
          {showHint2 && (
            <motion.div
              className="flex h-full w-full items-end justify-center pb-20"
              initial={{ y: '120vh' }}
              animate={{ y: 0 }}
              exit={{ y: '120vh' }}
              transition={{ duration: 1, ease: 'backOut' }}
            >
              <motion.h2
                className="text-center text-5xl font-bold text-white"
                style={{
                  textShadow: '0px 0px 2px #f06e5b, 0px 0px 2px #f06e5b, 0px 0px 2px #f06e5b',
                  filter: 'drop-shadow(0px 2px 0px rgba(0, 0, 0, 0.2))',
                }}
                animate={{
                  rotate: [-5, 5, -5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                Tap to claim it!
              </motion.h2>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 상품 표시 */}
        <AnimatePresence>
          {gameState === 'complete' && selectedPrize && (
            <motion.div
              className="absolute inset-0 z-20 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1 }}
            >
              {/* 샤인 효과 */}
              <motion.img
                src="https://assets.codepen.io/2509128/shine.png"
                className="absolute h-screen"
                // animate={{ rotate: 360 }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              {/* 상품 */}
              <motion.img
                src={selectedPrize.image}
                className="z-10 h-96"
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  rotate: [-5, 5, -5],
                }}
                transition={{
                  scale: { duration: 0.5, ease: 'backOut', delay: 1 },
                  rotate: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 결과 타이틀 */}
        <AnimatePresence>
          {gameState === 'complete' && selectedPrize && (
            <motion.div
              className="flex h-full w-full items-start justify-center pt-20"
              initial={{ y: '-50vh' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, delay: 2 }}
            >
              <h2
                className="text-center text-4xl font-bold text-white"
                style={{
                  textShadow: '0px 0px 2px #f06e5b, 0px 0px 2px #f06e5b, 0px 0px 2px #f06e5b',
                  filter: 'drop-shadow(0px 2px 0px rgba(0, 0, 0, 0.2))',
                }}
              >
                You got a<br />
                {selectedPrize.title}
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GachaGame;
