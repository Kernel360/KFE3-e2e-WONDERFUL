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

const useCountdown = (deadline: Date) => {
  const stableDeadline = useMemo(() => new Date(deadline), [deadline]);
  const [remaining, setRemaining] = useState(() => getRemainingTime(stableDeadline));

  useEffect(() => {
    // 이미 만료된 경우 초기값만 설정하고 종료
    if (remaining.isExpired) return;

    const interval = setInterval(() => {
      const updated = getRemainingTime(stableDeadline);
      setRemaining(updated);

      // 만료되었으면 타이머 제거
      if (updated.isExpired) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [remaining.isExpired, stableDeadline]);

  return remaining;
};

export default useCountdown;
