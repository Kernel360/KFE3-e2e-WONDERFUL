import { AuctionListItem } from '@/lib/types/auction-prisma';

import { AuctionItemProps } from '@/types/auction';

/**
 * API 데이터를 AuctionCard 컴포넌트용 Props로 변환
 */
export const convertToAuctionItemProps = (auction: AuctionListItem): AuctionItemProps => {
  const now = new Date();
  const endTime = new Date(auction.endTime);
  const isAuctionActive = auction.status === 'ACTIVE' && now < endTime;
  const auctionStatus = isAuctionActive ? '경매중' : '경매종료';

  return {
    id: auction.id,
    title: auction.title,
    status: auctionStatus as '경매중' | '경매종료',
    originalPrice: auction.auctionPrice?.startPrice || 0,
    currentPrice: auction.auctionPrice?.currentPrice || 0,
    deadline:
      auction.endTime instanceof Date
        ? auction.endTime.toISOString()
        : auction.endTime || new Date().toISOString(),
    thumbnailUrl: auction.thumbnailUrl || '',
  };
};
