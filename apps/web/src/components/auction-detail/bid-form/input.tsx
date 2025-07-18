import { UserRound } from 'lucide-react';
import { tv } from 'tailwind-variants';

import { InputIcon } from '@/components/common';
import { Button } from '@/components/ui/button';

import { formatCurrencyWithUnit } from '@/lib/utils/price';

interface BidInputProps {
  currentPrice: number;
  minUnit: number;
  bidPrice: number | null;
  isBidding: boolean;
  onChange: (price: number | null) => void;
}

const bidInputWrapper = tv({
  base: 'transition-all duration-600 overflow-hidden',
  variants: {
    open: {
      true: 'pt-2 max-h-[150px] translate-y-0',
      false: 'max-h-0 translate-y-4 pointer-events-none',
    },
  },
});

const BidFormInput = ({ currentPrice, minUnit, bidPrice, isBidding, onChange }: BidInputProps) => {
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
    <div className={bidInputWrapper({ open: isBidding })}>
      <InputIcon
        id="price"
        type="number"
        value={bidPrice ?? ''}
        label="희망입찰가"
        placeholder={placeholder}
        onChange={handleChange}
      >
        <UserRound />
      </InputIcon>

      <div className="my-2 grid grid-cols-4 gap-2">
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
