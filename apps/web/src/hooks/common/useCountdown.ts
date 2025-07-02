import { useEffect, useState } from 'react';

const getRemainingTime = (deadline: Date) => {
  const totalMs = deadline.getTime() - new Date().getTime();
  const isExpired = totalMs <= 0;

  const totalSeconds = Math.max(0, Math.floor(totalMs / 1000));
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');

  return { hours, minutes, seconds, isExpired };
};

const useCountdown = (deadline: Date) => {
  const [remaining, setRemaining] = useState(() => getRemainingTime(deadline));

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(getRemainingTime(deadline));
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  return remaining;
};

export default useCountdown;
