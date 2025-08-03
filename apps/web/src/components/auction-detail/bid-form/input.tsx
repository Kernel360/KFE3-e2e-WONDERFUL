import { UserRound } from 'lucide-react';
import { tv } from 'tailwind-variants';

import { InputIcon } from '@/components/common';
import { Button } from '@/components/ui/button';

import { useAuctionDetail } from '@/hooks/queries/auction';

import { formatCurrencyWithUnit, formatToKoreanUnit } from '@/lib/utils/price';

import { BidInputProps } from '@/types/bid';

const bidInputWrapper = tv({
  base: 'transition-all duration-600 overflow-hidden',
  variants: {
    open: {
      true: 'pt-2 max-h-[150px] translate-y-0',
      false: 'max-h-0 translate-y-4 pointer-events-none',
    },
  },
});

interface ExtendedBidInputProps extends BidInputProps {
  validationError?: string;
}

const BidFormInput = ({
  auctionId,
  currentPrice,
  minUnit, // 최소 입찰 단위
  bidPrice,
  isBidInputOpen,
  onChange,
  validationError = '',
}: ExtendedBidInputProps) => {
  const { data } = useAuctionDetail(auctionId);
  const minBidUnit = data?.data.auctionPrice?.minBidUnit || 1000;
  const placeholder = `${formatCurrencyWithUnit(currentPrice + minUnit)} 부터`;
  const defaultBidPrice = currentPrice + minBidUnit;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(',', '');
    const parsed = Number(value);
    onChange(isNaN(parsed) ? null : parsed);
  };

  const handleReset = () => {
    onChange(defaultBidPrice);
  };

  const increaseButtons = [
    {
      label: `+${formatToKoreanUnit(minBidUnit * 100)}`,
      amount: minBidUnit * 100,
      multiplier: '100배',
    },
    {
      label: `+${formatToKoreanUnit(minBidUnit * 50)}`,
      amount: minBidUnit * 50,
      multiplier: '50배',
    },
    {
      label: `+${formatToKoreanUnit(minBidUnit * 10)}`,
      amount: minBidUnit * 10,
      multiplier: '10배',
    },
    { label: `+${formatToKoreanUnit(minBidUnit)}`, amount: minBidUnit, multiplier: '1배' },
  ];

  const handleIncrease = (amount: number) => {
    const current = bidPrice ?? defaultBidPrice;
    onChange(current + amount);
  };

  return (
    <div className={bidInputWrapper({ open: isBidInputOpen })}>
      <InputIcon
        id="price"
        type="number"
        value={bidPrice ?? defaultBidPrice}
        label="희망입찰가"
        placeholder={placeholder}
        onChange={handleChange}
        minBidUnit={minBidUnit}
        resetValue={defaultBidPrice}
        onReset={handleReset}
        className={validationError && 'border-red-500'}
      >
        <UserRound />
      </InputIcon>
      {validationError && <div className="mt-1 text-sm text-red-500">{validationError}</div>}
      <div className="grid grid-cols-4 gap-2 py-2">
        {increaseButtons.map(({ label, amount, multiplier }) => (
          <Button
            key={amount}
            size="min"
            color="secondary"
            type="button"
            onClick={() => handleIncrease(amount)}
            className="flex h-auto flex-col items-center justify-center gap-0 px-2 py-1"
          >
            <span>{label}</span>
            <span className="text-xs opacity-70">({multiplier})</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BidFormInput;
