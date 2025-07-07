'use client';

import Link from 'next/link';

import BadgeBidStatus from '@/components/common/badge-bid-status';
import Thumbnail from '@/components/common/thumbnail';
import { Badge } from '@/components/ui/badge';

import useCountdown from '@/hooks/common/useCountdown';

import { AuctionItemProps } from '@/types/auction';

const renderTimeBadge = ({
  hours,
  minutes,
  isExpired,
}: {
  hours: string;
  minutes: string;
  isExpired: boolean;
}) => {
  if (isExpired) {
    return (
      <Badge variant="closed" className="pl-1 font-medium">
        ⏱️ 종료됨
      </Badge>
    );
  }

  const timeBadgeStyle = hours === '00' && minutes === '00' ? 'closed' : 'tertiary';

  return (
    <Badge variant={timeBadgeStyle} className="pl-1 font-medium">
      ⏱️ {`${hours}:${minutes}`}
    </Badge>
  );
};

const AuctionItemCard = ({
  id,
  title,
  status,
  originalPrice,
  currentPrice,
  deadline,
  thumbnailUrl,
}: AuctionItemProps) => {
  const { hours, minutes, isExpired } = useCountdown(new Date(deadline));

  // 실제 경매 상태 확인 (props로 받은 status와 시간 기반 확인 모두 고려)
  const isAuctionEnded = status === '경매종료' || isExpired;
  const finalStatus: '경매중' | '경매종료' = isAuctionEnded ? '경매종료' : '경매중';

  return (
    <Link href={`/auction/${id}`} className="flex w-full items-center justify-between gap-2.5">
      <div className="relative">
        <BadgeBidStatus status={finalStatus} />
        <Thumbnail url={thumbnailUrl} alt="test dummy" className="w-26.5 h-26.5" />
      </div>
      <div className="w-full shrink">
        <p className="leading-5.5 mb-1.5 line-clamp-2 text-lg font-medium text-neutral-900">
          {title}
        </p>
        <div className="flex justify-between">
          <div className="w-fll flex flex-col justify-evenly gap-2">
            <p className="text-sm font-medium leading-5 text-neutral-400">
              시작가 <span className="line-through">{originalPrice.toLocaleString()}</span>
            </p>
            {renderTimeBadge({ hours, minutes, isExpired: isAuctionEnded })}
          </div>
          <div className="w-fll flex shrink flex-col justify-end gap-2 text-right">
            <p className="leading-5">현재 입찰가</p>
            <p className="text-h3 text-primary-500 leading-none">
              <strong className="mr-0.5">{currentPrice.toLocaleString('ko-KR')}</strong>원
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AuctionItemCard;
