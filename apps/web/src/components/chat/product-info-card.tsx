'use client';

import { useState } from 'react';

import { Button } from '@/components/ui';
import Thumbnail from '@/components/ui/thumbnail';

import { formatCurrencyWithUnit } from '@/lib/utils/price';

import { dummyUrls } from '@/constants/dummy-urls';

const ProductInfoCard = () => {
  const [isDone, setIsDone] = useState(false);

  const dummy = {
    url: dummyUrls[0]!,
    title: '차량용 거치대',
    price: 8000,
  };

  const price = formatCurrencyWithUnit(dummy.price);

  const handleClick = () => {
    setIsDone(!isDone);
  };

  const color = isDone ? 'disabled' : 'primary';

  return (
    <div className="border-y-1 flex h-auto w-full flex-col justify-between border-neutral-100 p-3">
      <div className="flex h-full w-full items-center gap-2">
        <Thumbnail url={dummy.url} alt="image" className="h-12 w-12 shrink-0" />
        <p className="flex min-w-0 flex-1 flex-col">
          <span className="overflow-hidden truncate whitespace-nowrap text-base font-medium">
            {dummy.title}
          </span>
          <span className="text-sm font-medium text-neutral-600">현재가 {price}</span>
        </p>
      </div>
      <div className="flex justify-end">
        <Button
          variant="outline"
          color={color}
          size="min"
          onClick={handleClick}
          className="w-1/5"
          disabled={isDone}
        >
          거래종료
        </Button>
      </div>
    </div>
  );
};

export default ProductInfoCard;
