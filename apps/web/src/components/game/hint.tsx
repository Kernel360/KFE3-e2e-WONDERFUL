'use client';
import { AnimatePresence, motion } from 'motion/react';

interface HintProps {
  showHint: boolean;
  showHint2: boolean;
}

const Hint: React.FC<HintProps> = ({ showHint, showHint2 }) => {
  return (
    <>
      {/* 포인터 힌트 */}
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

      {/* 텍스트 힌트 */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <AnimatePresence>
          {showHint && (
            <motion.div
              className="flex h-full w-full items-end justify-center"
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
              className="flex h-full w-full items-end justify-center"
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
      </div>
    </>
  );
};

export default Hint;
