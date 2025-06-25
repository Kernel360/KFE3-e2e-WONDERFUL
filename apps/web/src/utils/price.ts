export const formatCurrency = (value: number | string): string => {
  const number = typeof value === 'string' ? parseInt(value.replace(/,/g, ''), 10) : value;
  if (isNaN(number)) return '0';
  return number.toLocaleString('ko-KR');
};

export const formatCurrencyWithUnit = (value: number | string): string => {
  return `${formatCurrency(value)}원`;
};
