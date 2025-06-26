// apps/web/src/components/common/time-picker.tsx
'use client';
import { useRef, useState } from 'react';

import { Clock } from 'lucide-react';

import { useOnClickOutside } from '@/hooks/common/useOnClickOutside';

import { cn } from '@/lib/utils';

import { formatTimeString, formatTo12HourTime } from '@/utils/date';

interface TimePickerProps {
  time: string;
  setTime: (time: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}
// 시간 데이터 생성
const hours = [...Array(12).keys()].map((hour) => formatTimeString(hour + 1));
const minutes = [...Array(60).keys()].map((minute) => formatTimeString(minute));
const ampm = ['오전', '오후'];

const TimePicker = ({
  time,
  setTime,
  placeholder = '시간 선택',
  disabled = false,
  className,
}: TimePickerProps) => {
  // 안전한 시간 파싱
  const parseFormattedTime = (formattedTime: string) => {
    const parts = formattedTime.split(' ');
    if (parts.length !== 2) {
      return { ampm: '오전', hour: 1, minute: 0 };
    }

    const [ampmPart, timePart] = parts;
    const timeParts = timePart?.split(':');

    if (!timeParts || timeParts.length !== 2) {
      return { ampm: ampmPart || '오전', hour: 1, minute: 0 };
    }

    const hour = Number(timeParts[0]);
    const minute = Number(timeParts[1]);

    return {
      ampm: ampmPart || '오전',
      hour: isNaN(hour) ? 1 : hour,
      minute: isNaN(minute) ? 0 : minute,
    };
  };

  const formattedTime = formatTo12HourTime(time);
  const { ampm: initAmpm, hour: initHour, minute: initMinute } = parseFormattedTime(formattedTime);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(formatTimeString(initHour));
  const [selectedMinute, setSelectedMinute] = useState(formatTimeString(initMinute));
  const [selectedAmpm, setSelectedAmpm] = useState(initAmpm);

  const timePickerRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(timePickerRef, () => setIsOpen(false));

  const updateTime = (hour: string, minute: string, ampm: string) => {
    let hourNumber = Number(hour);
    if (ampm === '오후' && hourNumber !== 12) {
      hourNumber += 12;
    } else if (ampm === '오전' && hourNumber === 12) {
      hourNumber = 0;
    }

    const newTime = `${formatTimeString(hourNumber)}:${minute}`;
    setTime(newTime);
  };

  const onHour = (hour: string) => {
    setSelectedHour(hour);
    updateTime(hour, selectedMinute, selectedAmpm);
  };

  const onMinute = (minute: string) => {
    setSelectedMinute(minute);
    updateTime(selectedHour, minute, selectedAmpm);
    setIsOpen(false);
  };

  const onAmPm = (ampm: string) => {
    setSelectedAmpm(ampm);
    updateTime(selectedHour, selectedMinute, ampm);
  };

  return (
    <div className={cn('relative inline-block', className)} ref={timePickerRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-[44px] w-full cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50',
          'min-w-[100px]'
        )}
      >
        <span className="flex items-center gap-2 text-[16px]">
          {time ? `${selectedAmpm} ${selectedHour}:${selectedMinute}` : placeholder}
          <Clock className="text-muted-foreground text-[#71717A]! h-6 w-6" />
        </span>
      </button>

      {isOpen && (
        <div className="bg-popover absolute right-0 top-full z-50 mt-1 rounded-md border p-0 shadow-lg">
          <div className="flex">
            {/* 오전/오후 선택 */}
            <div className="w-16 border-r">
              <div className="text-accent-foreground border-b px-3 py-2 text-sm font-medium">
                구분
              </div>
              <div className="max-h-32 overflow-y-auto">
                {ampm.map((option) => (
                  <button
                    key={option}
                    onClick={() => onAmPm(option)}
                    className={cn(
                      'hover:bg-accent hover:text-accent-foreground w-full px-3 py-2 text-left text-sm',
                      option === selectedAmpm && 'bg-accent text-accent-foreground font-medium'
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* 시간 선택 */}
            <div className="w-16 border-r">
              <div className="text-accent-foreground border-b px-3 py-2 text-sm font-medium">
                시간
              </div>
              <div className="max-h-32 overflow-y-auto">
                {hours.map((hour) => (
                  <button
                    key={hour}
                    onClick={() => onHour(hour)}
                    className={cn(
                      'hover:bg-accent hover:text-accent-foreground w-full px-3 py-2 text-left text-sm',
                      hour === selectedHour && 'bg-accent text-accent-foreground font-medium'
                    )}
                  >
                    {hour}
                  </button>
                ))}
              </div>
            </div>

            {/* 분 선택 */}
            <div className="w-16">
              <div className="text-accent-foreground border-b px-3 py-2 text-sm font-medium">
                분
              </div>
              <div className="max-h-32 overflow-y-auto">
                {minutes.map((minute) => (
                  <button
                    key={minute}
                    onClick={() => onMinute(minute)}
                    className={cn(
                      'hover:bg-accent hover:text-accent-foreground w-full px-3 py-2 text-left text-sm',
                      minute === selectedMinute && 'bg-accent text-accent-foreground font-medium'
                    )}
                  >
                    {minute}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
