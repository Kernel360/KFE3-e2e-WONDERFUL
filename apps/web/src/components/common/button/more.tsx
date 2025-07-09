'use client';

import { EllipsisVertical } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui';

interface ButtonMoreProps {
  items: ButtonMoreItem[];
}

export interface ButtonMoreItem {
  id: string;
  title: string;
  onClick: () => void;
}

const ButtonMore = ({ items }: ButtonMoreProps) => {
  const handleItemClick = (item: ButtonMoreItem) => {
    if (item.onClick) {
      item.onClick();
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button aria-label="More options">
          <EllipsisVertical />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-25 py-2">
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="cursor-pointer text-center"
            >
              {item.title}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default ButtonMore;
