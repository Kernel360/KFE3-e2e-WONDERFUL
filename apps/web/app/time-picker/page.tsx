// apps/web/app/time-picker/page.tsx
'use client';

import { useState } from 'react';

import TimePicker from '@/components/common/time-picker';

const TimePickerExample = () => {
  const [selectedTime, setSelectedTime] = useState<string>('09:00');
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('18:00');

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 폼 전송 동작 방지

    console.log('=== 폼 데이터 ===');
    console.log('시작 시간:', startTime);
    console.log('종료 시간:', endTime);
    console.log('선택된 시간:', selectedTime);
  };

  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center gap-2">
        {/* <span className="text-[16px]! mr-1 text-sm font-medium">시간 선택</span> */}
        <TimePicker
          time={selectedTime}
          setTime={setSelectedTime}
          placeholder="시간을 선택해주세요"
        />
      </div>

      <div className="bg-muted mt-4 rounded-lg p-4">
        <p className="text-sm">선택된 시간: {selectedTime}</p>
      </div>

      {/* 폼에서 사용하는 예시 */}
      <div className="mt-8 space-y-4">
        <h3 className="text-lg font-semibold">폼에서 사용 예시</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">시작 시간</label>
              <TimePicker time={startTime} setTime={setStartTime} className="w-full" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">종료 시간</label>
              <TimePicker time={endTime} setTime={setEndTime} className="w-full" />
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm">현재 설정:</p>
            <p className="text-sm">• 시작: {startTime}</p>
            <p className="text-sm">• 종료: {endTime}</p>
          </div>

          <button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2"
          >
            저장하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default TimePickerExample;
