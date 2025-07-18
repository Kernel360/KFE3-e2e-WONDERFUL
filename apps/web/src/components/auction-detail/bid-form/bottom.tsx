'use client';

import { useState } from 'react';

import { ButtonFavorite } from '@/components/auction-detail/';
import { Button } from '@/components/ui';

import { formatCurrencyWithUnit } from '@/lib/utils/price';

import { BidFormBottomProps } from '@/types/bid';

const BidFormBottom = ({
  currentPrice,
  isExpired,
  isBidding,
  onChange,
  bidTableRef,
}: BidFormBottomProps) => {
  const [bidPrice, setBidPrice] = useState<number | null>(null);

  const formattedCurrentPrice = formatCurrencyWithUnit(currentPrice);

  const handleBidClick = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isBidding) {
      onChange(true);
      return;
    }

    // 경매가 종료된 경우 입찰 불가
    if (isExpired) {
      alert('경매가 종료되어 입찰할 수 없습니다.');
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
    <div className="bg-wthie z-40 flex items-center gap-2 bg-white px-5 pb-6 pt-3">
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
