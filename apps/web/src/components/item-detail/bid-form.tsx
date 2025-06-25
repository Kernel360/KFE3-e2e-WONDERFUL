import { Button } from '@/components/ui/button';
import ButtonFavorite from '@/components/item-detail/button-favorite';
import BannerDirect from '@/components/item-detail/banner-direct';
import { formatCurrencyWithUnit } from '@/utils/price';
import BidInput from '@/components/item-detail/bid-input';
import { useState } from 'react';

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
    <div className="flex w-full flex-col gap-4 bg-white p-4 shadow-[0_-4px_8px_-2px_rgba(0,0,0,0.05)]">
      <BannerDirect directPrice={directPrice} />
      {isBidding && (
        <BidInput currentPrice={15000} minUnit={1000} bidPrice={bidPrice} onChange={setBidPrice} />
      )}
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
