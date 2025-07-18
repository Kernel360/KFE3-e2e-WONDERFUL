'use client';

import { useState } from 'react';

import { X } from 'lucide-react';
import { tv } from 'tailwind-variants';

import { BidFormBottom } from '@/components/auction-detail';
import { ButtonDirectDeal, BidFormInput } from '@/components/auction-detail';

import useCountdown from '@/hooks/common/useCountdown';

import { cn } from '@/lib/cn';
import { formatCurrencyWithUnit } from '@/lib/utils/price';

interface BidFormProps {
  auctionId: string;
  currentPrice: number;
  endTime: string | Date; // 경매 종료 시간
}

const BidForm = ({ auctionId, currentPrice, endTime }: BidFormProps) => {
  const [isBidInputOpen, setIsBidInputOpen] = useState(false);
  const [bidPrice, setBidPrice] = useState<number | null>(null);

  // 경매 종료 시간까지의 카운트다운
  const { isExpired } = useCountdown(new Date(endTime));
  const directPrice = formatCurrencyWithUnit(currentPrice * 1.2); // 20% 증가한 가격

  return (
    <form>
      {/* 그림자 배경*/}
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 bottom-[98%] z-0 h-2/5',
          'from-black/16 bg-gradient-to-t to-transparent',
          'duration-600 transition-all',
          !isBidInputOpen && 'h-6 opacity-30'
        )}
      />

      <div
        className={cn('duration-600 relative z-20 rounded-t-sm bg-white px-5 pt-6 transition-all')}
      >
        {!isExpired && <ButtonDirectDeal directPrice={directPrice} />}

        <BidFormInput
          currentPrice={currentPrice}
          minUnit={1000}
          bidPrice={bidPrice}
          isBidding={isBidInputOpen}
          onChange={setBidPrice}
        />

        <button
          type="button"
          onClick={() => setIsBidInputOpen(false)}
          className={`duration-600 invisible absolute right-2.5 top-0 translate-y-[-100%] p-2 text-white opacity-0 ${isBidInputOpen && 'visible opacity-100'}`}
        >
          <X size={'30'} />
        </button>
      </div>

      <BidFormBottom
        auctionId={auctionId}
        currentPrice={currentPrice}
        endTime={endTime}
        isExpired={isExpired}
        isBidding={isBidInputOpen}
        onChange={setIsBidInputOpen}
      />
    </form>
  );
};

export default BidForm;
