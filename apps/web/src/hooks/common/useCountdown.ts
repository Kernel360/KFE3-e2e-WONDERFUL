'use client';

import { useEffect, useMemo, useState } from 'react';

const getRemainingTime = (deadline: Date) => {
  const totalMs = deadline.getTime() - new Date().getTime();
  const isExpired = totalMs <= 0;

  const totalSeconds = Math.max(0, Math.floor(totalMs / 1000));
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');

  return { hours, minutes, seconds, isExpired };
};

const useCountdown = (deadline: Date, type: 'minute' | 'second') => {
  const stableDeadline = useMemo(() => new Date(deadline), [deadline]);
  const [remaining, setRemaining] = useState(() => getRemainingTime(stableDeadline));

  useEffect(() => {
    // 이미 만료된 경우 초기값만 설정하고 종료
    if (remaining.isExpired) return;
    const intervalMs = type === 'minute' ? 60000 : 1000;

    const interval = setInterval(() => {
      const updated = getRemainingTime(stableDeadline);
      setRemaining(updated);

      if (updated.isExpired) {
        clearInterval(interval);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [remaining.isExpired, stableDeadline, type]);

  return remaining;
};

export default useCountdown;
