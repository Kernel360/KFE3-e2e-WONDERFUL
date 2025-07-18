import { Check } from 'lucide-react';

import { Button } from '@/components/ui';

interface ButtonSelectProps {
  isSelected: boolean;
  onClick: () => void;
}

const ButtonSelect = ({ isSelected, onClick }: ButtonSelectProps) => {
  const textColor = isSelected ? 'text-primary-500' : 'text-neutral-400';

  return (
    <Button
      variant="solid"
      color="transparent"
      size="sm"
      aria-label={isSelected ? 'Deselect' : 'Select'}
      aria-pressed={isSelected}
      onClick={onClick}
    >
      <Check className={textColor} strokeWidth={2.5} />
    </Button>
  );
};

export default ButtonSelect;
