'use client';

import { useState } from 'react';

import { X } from 'lucide-react';

import { BidFormBottom } from '@/components/auction-detail';
import { ButtonDirectDeal, BidFormInput } from '@/components/auction-detail';

import useCountdown from '@/hooks/common/useCountdown';

import { cn } from '@/lib/cn';
import { formatCurrencyWithUnit } from '@/lib/utils/price';

import { BidFormProps } from '@/types/bid';

const BidForm = ({ auctionId, currentPrice, endTime, bidTableRef }: BidFormProps) => {
  const [isBidInputOpen, setIsBidInputOpen] = useState(false);
  const [bidPrice, setBidPrice] = useState<number | null>(null);

  // 경매 종료 시간까지의 카운트다운
  const { isExpired } = useCountdown(new Date(endTime));
  const directPrice = formatCurrencyWithUnit(currentPrice * 1.2); // 20% 증가한 가격

  const handleBidClick = (e: React.FormEvent) => {
    e.preventDefault();

    // 경매가 종료된 경우 입찰 불가
    if (isExpired) {
      alert('경매가 종료되어 입찰할 수 없습니다.');
      return;
    }

    if (!isBidInputOpen) {
      setIsBidInputOpen(true);
      return;
    }

    if (bidPrice === null) return alert('입찰 금액을 입력해주세요');

    // 여기에 실제 입찰 로직 추가
    try {
      const results = true;

      //입찰 완료 시 bid-table로 scroll 이동
      if (results) {
        bidTableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleBidClick}>
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
          isBidInputOpen={isBidInputOpen}
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
      />
    </form>
  );
};

export default BidForm;
