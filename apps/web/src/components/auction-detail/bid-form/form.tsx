import { useState } from 'react';

import { tv } from 'tailwind-variants';

import { BidFormBottom } from '@/components/auction-detail';
import { ButtonDirectDeal, BidFormInput } from '@/components/auction-detail';

import useCountdown from '@/hooks/common/useCountdown';

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

interface BidFormProps {
  auctionId: string;
  currentPrice: number;
  endTime: string | Date; // 경매 종료 시간
}

const BidForm = ({ auctionId, currentPrice, endTime }: BidFormProps) => {
  const [isBidding, setIsBidding] = useState(false);
  const [bidPrice, setBidPrice] = useState<number | null>(null);

  // 경매 종료 시간까지의 카운트다운
  const { isExpired } = useCountdown(new Date(endTime));

  const directPrice = formatCurrencyWithUnit(currentPrice * 1.2); // 20% 증가한 가격

  return (
    <form className="duration-600 flex w-full flex-col gap-2 bg-white p-4 shadow-[0_-4px_8px_-2px_rgba(0,0,0,0.05)] transition-all">
      <div className="flex w-full justify-center">
        <div className="h-1 w-1/3 rounded-full bg-neutral-200" />
      </div>
      <div className={`duration-600 transition-all ${isBidding ? 'pb-4' : 'pb-0'}`}>
        {!isExpired && <ButtonDirectDeal directPrice={directPrice} />}

        {isExpired && (
          <div className="mb-2 rounded-lg bg-neutral-100 p-3 text-center">
            <span className="text-sm font-medium text-neutral-600">경매가 종료되었습니다</span>
          </div>
        )}

        <div className={bidInputWrapper({ open: isBidding && !isExpired })}>
          <BidFormInput
            currentPrice={currentPrice}
            minUnit={1000}
            bidPrice={bidPrice}
            onChange={setBidPrice}
          />
        </div>
      </div>

      <BidFormBottom
        auctionId={auctionId}
        currentPrice={currentPrice}
        endTime={endTime}
        isExpired={isExpired}
      />
    </form>
  );
};

export default BidForm;
