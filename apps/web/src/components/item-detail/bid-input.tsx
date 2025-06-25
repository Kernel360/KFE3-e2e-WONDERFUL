import InputIcon from '@/components/common/input-icon';
import { UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrencyWithUnit } from '@/utils/price';

interface BidInputProps {
  currentPrice: number;
  minUnit: number;
  bidPrice: number | null;
  onChange: (price: number | null) => void;
}

const BidInput = ({ currentPrice, minUnit, bidPrice, onChange }: BidInputProps) => {
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
      >
        <UserRound />
      </InputIcon>

      <div className="mt-2 grid grid-cols-4 gap-2">
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

export default BidInput;
