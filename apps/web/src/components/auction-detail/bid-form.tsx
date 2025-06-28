import { useState } from 'react';

import { tv } from 'tailwind-variants';

import BannerDirect from '@/components/auction-detail/banner-direct';
import BidInput from '@/components/auction-detail/bid-input';
import ButtonFavorite from '@/components/auction-detail/button-favorite';
import { Button } from '@/components/ui/button';

import { formatCurrencyWithUnit } from '@/lib/utils/price';

const bidInputWrapper = tv({
  base: 'transition-all duration-700 overflow-hidden',
  variants: {
    open: {
      true: 'pt-2 max-h-[300px] translate-y-0',
      false: 'max-h-0 translate-y-4 pointer-events-none',
    },
  },
});

const BidForm = () => {
  const [isBidding, setIsBidding] = useState(false);
  const [bidPrice, setBidPrice] = useState<number | null>(null);

  const directPrice = formatCurrencyWithUnit(20000);
  const currentPrice = formatCurrencyWithUnit(15000);

  const handleBidClick = () => {
    if (!isBidding) return setIsBidding((prev) => !prev);

    if (bidPrice === null) return alert('입찰 금액을 입력해주세요');
  };

  return (
    <div className="duration-600 flex w-full flex-col gap-2 bg-white p-4 shadow-[0_-4px_8px_-2px_rgba(0,0,0,0.05)] transition-all">
      <div className="flex w-full justify-center">
        <div className="h-1 w-1/3 rounded-full bg-neutral-200" />
      </div>
      <div className={`duration-600 transition-all ${isBidding ? 'pb-4' : 'pb-0'}`}>
        <BannerDirect directPrice={directPrice} />
        <div className={bidInputWrapper({ open: isBidding })}>
          <BidInput
            currentPrice={15000}
            minUnit={1000}
            bidPrice={bidPrice}
            onChange={setBidPrice}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ButtonFavorite itemId="123" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-neutral-600">현재 입찰가</span>
            <span className="text-xl font-bold text-indigo-500">{currentPrice}</span>
          </div>
        </div>
        <Button size="medium" color="primary" onClick={handleBidClick}>
          입찰하기
        </Button>
      </div>
    </div>
  );
};

export default BidForm;
