import type { Prisma } from '@repo/db';

// 경매 목록 아이템
// 화면에 보여질 필드들: 카테고리, 아이템 썸네일, 타이틀, 경매상태, 시작가, 시작시간, 마감시간, 현재 가격
export type AuctionListItem = Prisma.AuctionItemGetPayload<{
  include: {
    category: {
      select: {
        id: true;
        name: true;
      };
    };
    auctionPrice: {
      select: {
        startPrice: true; // 시작가 (start_price)
        currentPrice: true; // 현재 가격 (current_price)
        instantPrice: true; // 즉시구매가 (instant_price)
        minBidUnit: true; // 최소 입찰 단위 (min_bid_unit)
        isInstantBuyEnabled: true; // 즉시구매 가능 여부
        isExtendedAuction: true; // 연장 경매 여부
      };
    };
    _count: {
      select: {
        bids: true;
        favoriteItems: true;
      };
    };
  };
}>;

// API 응답 타입들
export interface AuctionListResponse {
  data: AuctionListItem[];
  total: number;
}

// 필터 및 정렬 타입들
export interface AuctionFilters {
  location_id?: string;
  category_id?: string;
}

export type SortOption = 'latest' | 'ending_soon' | 'price_low' | 'price_high' | 'popular';

export interface AttacedAuctionImageProps {
  url: string;
  handleDelete: React.MouseEventHandler<HTMLButtonElement>;
}

//경매 게시글 등록 스토리지 이미지
export interface AttachImageInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imgLength: number;
}
