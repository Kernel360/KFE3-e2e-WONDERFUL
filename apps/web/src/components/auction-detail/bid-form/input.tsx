import { UserRound } from 'lucide-react';
import { tv } from 'tailwind-variants';

import { InputIcon } from '@/components/common';
import { Button } from '@/components/ui/button';

import { useAuctionDetail } from '@/hooks/queries/auction';

import { formatCurrencyWithUnit } from '@/lib/utils/price';

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
  // isBidInputOpen,
  onChange,
  validationError = '',
}: ExtendedBidInputProps) => {
  const { data } = useAuctionDetail(auctionId);
  const minBidUnit = data?.data.auctionPrice?.minBidUnit || 1000;

  const placeholder = `${formatCurrencyWithUnit(currentPrice + minUnit)} 부터`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(',', '');
    const parsed = Number(value);
    onChange(isNaN(parsed) ? null : parsed);
  };

  const increaseButtons = [
    { label: '+10만', amount: 100_000 },
    { label: '+5만', amount: 50_000 },
    { label: '+1만', amount: 10_000 },
    { label: '+1천원', amount: 1_000 },
  ];

  const handleIncrease = (amount: number) => {
    const current = bidPrice ?? currentPrice;
    onChange(current + amount);
  };

  return (
    <div>
      <InputIcon
        id="price"
        type="number"
        value={bidPrice ?? ''}
        label="희망입찰가"
        placeholder={placeholder}
        onChange={handleChange}
        minBidUnit={minBidUnit}
        className={validationError ? 'border-red-500' : ''}
      >
        <UserRound />
      </InputIcon>

      {/* 검증 에러 메시지 */}
      {validationError && <div className="mt-1 text-sm text-red-500">{validationError}</div>}

      <div className="grid grid-cols-4 gap-2 py-2">
        {increaseButtons.map(({ label, amount }) => (
          <Button
            key={amount}
            size="min"
            color="secondary"
            type="button"
            onClick={() => handleIncrease(amount)}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BidFormInput;
