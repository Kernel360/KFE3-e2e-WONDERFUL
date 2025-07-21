'use client';

import { useState } from 'react';

import { BidFormBottom, BidFormInput, ButtonDirectDeal } from '@/components/auction-detail';

import useCountdown from '@/hooks/common/useCountdown';
import { useBidMutation } from '@/hooks/mutations/bids';

import { cn } from '@/lib/cn';
import { formatCurrencyWithUnit } from '@/lib/utils/price';

import { BidFormProps } from '@/types/bid';

const BidForm = ({ auctionId, currentPrice, endTime, bidTableRef }: BidFormProps) => {
  // const [isBidInputOpen, setIsBidInputOpen] = useState(false);
  const [bidPrice, setBidPrice] = useState<number | null>(null);

  // 입찰 뮤테이션
  const bidMutation = useBidMutation();

  // 경매 종료 시간까지의 카운트다운
  const { isExpired } = useCountdown(new Date(endTime));
  const directPrice = formatCurrencyWithUnit(currentPrice * 1.2); // 20% 증가한 가격

  const handleBidClick = async (e: React.FormEvent) => {
    e.preventDefault();

    // 경매가 종료된 경우 입찰 불가
    if (isExpired) {
      alert('경매가 종료되어 입찰할 수 없습니다.');
      return;
    }

    // if (!isBidInputOpen) {
    //   setIsBidInputOpen(true);
    //   return;
    // }

    if (bidPrice === null) {
      alert('입찰 금액을 입력해주세요');
      return;
    }

    try {
      // 현재 스크롤 위치 저장
      const currentScrollY = window.scrollY;

      // 입찰 성공 시 (폼 축소)
      // setBidPrice(null);
      // setIsBidInputOpen(false);

      // API 호출
      await bidMutation.mutateAsync({
        auctionId,
        bidPrice,
      });

      // 스크롤만 처리
      setTimeout(() => {
        window.scrollTo(0, currentScrollY);
        bidTableRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    } catch (error) {
      // 에러 시 폼 상태 복원
      // setIsBidInputOpen(true);
      alert(error instanceof Error ? error.message : '입찰 중 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleBidClick}>
      <div
        className={cn(
          'w-full bg-white transition-all duration-500 ease-in-out'
          // isBidInputOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      />

      <div
        className={cn(
          'duration-600 relative rounded-t-sm bg-white px-5 pt-4 shadow-[var(--shadow-nav)] transition-all'
        )}
      >
        {!isExpired && <ButtonDirectDeal directPrice={directPrice} />}

        <BidFormInput
          currentPrice={currentPrice}
          minUnit={1000}
          bidPrice={bidPrice}
          // isBidInputOpen={isBidInputOpen}
          onChange={setBidPrice}
        />

        {/* <button
          type="button"
          // onClick={() => setIsBidInputOpen(false)}
          // className={`duration-600 invisible absolute right-2.5 top-6 translate-y-[-100%] p-2 text-black opacity-0 ${isBidInputOpen && 'visible opacity-100'}`}
        >
          <X size={'30'} />
        </button> */}
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
