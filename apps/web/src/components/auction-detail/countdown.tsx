import useCountdown from '@/hooks/common/useCountdown';

interface CountdownProps {
  date: Date;
}

const Countdown = ({ date }: CountdownProps) => {
  const { hours, minutes, seconds } = useCountdown(date);
  const formatted = `${hours}:${minutes}:${seconds}`;

  return (
    <time
      className="text-3xl font-medium text-rose-600"
      dateTime={date.toISOString()}
      aria-label={`남은 시간 ${hours}시간 ${minutes}분 ${seconds}초`}
    >
      {formatted}
    </time>
  );
};

export default Countdown;
