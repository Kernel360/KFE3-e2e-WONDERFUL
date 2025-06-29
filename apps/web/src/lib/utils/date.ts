import { format, setHours, setMinutes } from 'date-fns';
import { ko } from 'date-fns/locale';

// timestamp 형식의 데이터를 아래와 같이 변환해주는 포매터 함수
// Thu Jun 26 2025 04:52:38 GMT+0900 => 2025.06.26. 04:52
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  return `${year}.${month}.${day}. ${hour}:${minute}`;
};

export const formatTimeString = (time: number) => (time < 10 ? '0' + time : String(time));

export const formatTo12HourTime = (time: string) => {
  const timeParts = time.split(':');

  // 타입 가드로 undefined 체크
  if (timeParts.length !== 2) {
    throw new Error('허용 되지 않는 시간 형식입니다. 올바른 형식은 "HH:mm"입니다.');
  }

  const hour = Number(timeParts[0]);
  const minute = Number(timeParts[1]);

  // 숫자 변환 체크
  if (isNaN(hour) || isNaN(minute)) {
    throw new Error('허용 되지 않는 시간 형식입니다. 시간과 분은 숫자여야 합니다.');
  }

  const date = setMinutes(setHours(new Date(), hour), minute);
  return format(date, 'a hh:mm', { locale: ko });
};

/**
 * 문자열로 받은 시간(예: "3")을 현재 시각 기준으로 더한 ISO 문자열을 반환
 * @param hours 문자열 형태의 시간 (예: "3" => 3시간 후)
 * @returns ISO 형식의 타임스탬프
 */
export const convertHoursToTimestamp = (hours: string): string => {
  const now = new Date();
  const added = new Date(now.getTime() + parseInt(hours, 10) * 60 * 60 * 1000);
  return added.toISOString();
};
