import { EllipsisVertical } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui';

interface ButtonMoreProps {
  items: ButtonMoreItem[];
}

export interface ButtonMoreItem {
  title: string;
  onClick: () => void;
}

const ButtonMore = ({ items }: ButtonMoreProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <EllipsisVertical />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-25 py-2">
        <ul className="space-y-2">
          {items.map((item, idx) => (
            <li key={item.id ?? idx} onClick={item.onClick} className="cursor-pointer text-center">
              {item.title}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default ButtonMore;
