'use client';
import React from 'react';

import Image from 'next/image';

import { AnimatePresence, motion } from 'motion/react';

import { useGachaGame } from '@/hooks/common/useGachaGame';

import Ball from './ball';
import Confetti from './confetti';
import Hint from './hint';

const GachaGameClient: React.FC = () => {
  const {
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
  } = useGachaGame();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-600">
      {/* 배경 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(https://assets.codepen.io/2509128/bg.jpg)' }}
      />

      {/* 컨페티 */}
      <Confetti showConfetti={showConfetti} particles={confettiParticles} />

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
              <Ball
                key={ball.id}
                ball={ball}
                index={index}
                gameState={gameState}
                isJittering={isJittering}
                onPrizeBallClick={handlePrizeBallClick}
              />
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

          {/* 힌트 포인터 */}
          <Hint showHint={showHint} showHint2={showHint2} />
        </motion.div>
      </div>

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
  );
};

export default GachaGameClient;
