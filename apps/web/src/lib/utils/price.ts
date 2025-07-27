export const formatCurrency = (value: number | string): string => {
  const number = typeof value === 'string' ? parseInt(value.replace(/,/g, ''), 10) : value;
  if (isNaN(number)) return '0';
  return number.toLocaleString('ko-KR');
};

export const formatCurrencyWithUnit = (value: number | string): string => {
  return `${formatCurrency(value)}원`;
};

// 한국어 단위 변환 (예) 10000 -> 1만, 100000000 -> 1억
export const formatToKoreanUnit = (value: number): string => {
  if (value >= 100000000) {
    const billions = Math.floor(value / 100000000);
    const remainder = value % 100000000;
    if (remainder === 0) {
      return `${billions}억원`;
    } else {
      const millions = Math.floor(remainder / 10000);
      return `${billions}억${millions > 0 ? `${millions}만` : ''}원`;
    }
  } else if (value >= 10000) {
    const tenThousands = Math.floor(value / 10000);
    const remainder = value % 10000;
    if (remainder === 0) {
      return `${tenThousands}만원`;
    } else {
      return `${tenThousands}만${remainder.toLocaleString()}원`;
    }
  } else {
    return `${value.toLocaleString()}원`;
  }
};
