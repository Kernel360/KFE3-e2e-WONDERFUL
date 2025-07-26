'use client';

import { useState } from 'react';

import productCardStyle from '@/components/chat/style';
import { Button } from '@/components/ui';
import Thumbnail from '@/components/ui/thumbnail';

import { useCurrentPrice } from '@/hooks/auction/useCurrentPrice';
import { useAuctionDetail } from '@/hooks/queries/auction';
import { useBidsByAuction } from '@/hooks/queries/bids';

import { formatCurrencyWithUnit } from '@/lib/utils/price';

const ProductInfoCard = ({ auctionId }: { auctionId: string }) => {
  const [isDone, setIsDone] = useState(false);

  const {
    data: auctionDetailData,
    isLoading,
    error,
    refetch: refetchAuction,
  } = useAuctionDetail(auctionId);

  const auction = auctionDetailData?.data;
  const { data: initialBidsData } = useBidsByAuction(auctionId, 1);

  const fallbackPrice =
    Number(initialBidsData?.data?.[0]?.price) ?? Number(auction?.auctionPrice?.currentPrice ?? 0);
  const { currentPrice, refetchCurrentPrice } = useCurrentPrice(auctionId, fallbackPrice);
  const price = formatCurrencyWithUnit(currentPrice);

  const handleClick = () => setIsDone((prev) => !prev);
  const color = isDone ? 'disabled' : 'primary';

  if (isLoading) {
    return (
      <div className={productCardStyle().wrapper()}>
        <div className={productCardStyle().loading()}>경매 정보를 불러오는 중...</div>
      </div>
    );
  }

  if (error || !auctionDetailData?.data) {
    return (
      <div className={productCardStyle().wrapper()}>
        <div className={productCardStyle().error()}>
          경매 정보를 불러오는 중 오류가 발생했습니다.
        </div>
        <Button
          variant="outline"
          color={color}
          size="min"
          onClick={() => refetchAuction()}
          className="w-1/5"
        >
          다시 시도
        </Button>
      </div>
    );
  }

  return (
    <div className={productCardStyle().wrapper()}>
      <div className="flex h-full w-full items-center gap-2">
        {auction && auction.thumbnailUrl && auction.thumbnailUrl.length > 0 && (
          <Thumbnail
            url={auction.thumbnailUrl}
            alt={auction.title}
            className="h-12 w-12 shrink-0"
          />
        )}
        <p className="flex min-w-0 flex-1 flex-col">
          <span className="overflow-hidden truncate whitespace-nowrap text-base font-medium">
            {auction?.title}
          </span>
          <span className="text-sm font-medium text-neutral-600">현재가 {price}</span>
        </p>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          color={color}
          size="min"
          onClick={() => refetchCurrentPrice()}
          className="w-1/5"
        >
          새로고침
        </Button>
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
