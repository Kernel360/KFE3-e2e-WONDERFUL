'use client';
import { AnimatePresence, motion } from 'motion/react';

import { ConfettiParticle } from '@/lib/types';

interface ConfettiProps {
  showConfetti: boolean;
  particles: ConfettiParticle[];
}

const Confetti: React.FC<ConfettiProps> = ({ showConfetti, particles }) => {
  return (
    <AnimatePresence>
      {showConfetti && (
        <div className="pointer-events-none absolute inset-0 z-50">
          {particles.map((particle) => (
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
  );
};

export default Confetti;
