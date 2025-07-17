'use client';

import { useState } from 'react';

import { ButtonFavorite } from '@/components/auction-detail/';
import { Button } from '@/components/ui';

import { formatCurrencyWithUnit } from '@/lib/utils/price';

const BidFormBottom = ({
  auctionId,
  endTime,
  currentPrice,
  isExpired,
}: {
  auctionId: string;
  endTime: string | Date;
  currentPrice: number;
  isExpired: boolean;
}) => {
  const [isBidding, setIsBidding] = useState(false);
  const [bidPrice, setBidPrice] = useState<number | null>(null);

  const formattedCurrentPrice = formatCurrencyWithUnit(currentPrice);

  const handleBidClick = () => {
    // 경매가 종료된 경우 입찰 불가
    if (isExpired) {
      alert('경매가 종료되어 입찰할 수 없습니다.');
      return;
    }
    if (!isBidding) return setIsBidding((prev) => !prev);

    if (bidPrice === null) return alert('입찰 금액을 입력해주세요');

    // 여기에 실제 입찰 로직 추가
    // console.log('입찰 처리:', bidPrice);
  };

  return (
    <div className="flex items-center gap-2">
      <ButtonFavorite auctionId="123" />
      <div className="flex flex-1 flex-col">
        <span className="text-sm font-medium text-neutral-600">
          {isExpired ? '최종 낙찰가' : '현재 입찰가'}
        </span>
        <span className="text-xl font-bold text-indigo-500">{formattedCurrentPrice}</span>
      </div>
      <Button
        size="medium"
        color={isExpired ? 'disabled' : 'primary'}
        onClick={handleBidClick}
        disabled={isExpired}
        className={`w-1/3`}
      >
        {isExpired ? '경매종료' : '입찰하기'}
      </Button>
    </div>
  );
};

export default BidFormBottom;
