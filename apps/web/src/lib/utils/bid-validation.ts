import { formatCurrencyWithUnit } from './price';

export const validateBidPrice = (
  bidPrice: number | null,
  currentPrice: number,
  minBidUnit: number
): { isValid: boolean; message: string } => {
  if (bidPrice === null) {
    return { isValid: false, message: '입찰 금액을 입력해주세요.' };
  }

  if (bidPrice <= currentPrice) {
    return {
      isValid: false,
      message: `현재 입찰가(${formatCurrencyWithUnit(currentPrice)})보다 높은 금액을 입력해주세요.`,
    };
  }

  const minimumBid = currentPrice + minBidUnit;
  if (bidPrice < minimumBid) {
    return {
      isValid: false,
      message: `최소 입찰 금액은 ${formatCurrencyWithUnit(minimumBid)}입니다. (입찰 단위: ${formatCurrencyWithUnit(minBidUnit)})`,
    };
  }

  // 입찰 단위로 나누어떨어지는지 확인
  const priceAboveCurrent = bidPrice - currentPrice;
  if (priceAboveCurrent % minBidUnit !== 0) {
    return {
      isValid: false,
      message: `입찰 단위(${formatCurrencyWithUnit(minBidUnit)})에 맞춰 입찰해주세요.`,
    };
  }

  return { isValid: true, message: '' };
};
