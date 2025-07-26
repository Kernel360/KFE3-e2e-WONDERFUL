import useCountdown from '@/hooks/common/useCountdown';

import { cn } from '@/lib/cn';

interface CountdownProps {
  date: Date;
}

const Countdown = ({ date }: CountdownProps) => {
  const { hours, minutes, seconds, isExpired } = useCountdown(date);
  const formatted = `${hours}:${minutes}:${seconds}`;
  return (
    <time
      className={cn(`text-3xl font-medium`, isExpired ? 'text-neutral-400' : 'text-danger-600')}
      dateTime={date.toISOString()}
      aria-label={`남은 시간 ${hours}시간 ${minutes}분 ${seconds}초`}
    >
      {formatted}
    </time>
  );
};

export default Countdown;
