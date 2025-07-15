'use client';
import { motion } from 'motion/react';

import type { Ball as BallType } from '@/lib/types';

interface BallProps {
  ball: BallType;
  index: number;
  gameState: 'init' | 'ready' | 'playing' | 'complete';
  isJittering: boolean;
  onPrizeBallClick: () => void;
}

const Ball: React.FC<BallProps> = ({ ball, index, gameState, isJittering, onPrizeBallClick }) => {
  return (
    <motion.div
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
          : ball.isPrize && gameState === 'playing'
            ? ['0vh', '12vh', '23vh', '22vh', '23vh', '22.5vh', '23vh']
            : 0,
        x: isJittering
          ? [0, Math.random() * 4 - 2, 0]
          : ball.isPrize && gameState === 'playing'
            ? '-3vh'
            : 0,
        rotate: ball.rotate + (isJittering ? Math.random() * 10 - 5 : 0),
      }}
      transition={{
        duration: isJittering
          ? Math.random() * 0.1 + 0.05
          : ball.isPrize && gameState === 'playing'
            ? 2.5
            : 0,
        repeat: isJittering ? Infinity : 0,
        delay: isJittering ? -index * 0.0613 : 0,
      }}
      onClick={() => ball.isPrize && onPrizeBallClick()}
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
  );
};

export default Ball;
