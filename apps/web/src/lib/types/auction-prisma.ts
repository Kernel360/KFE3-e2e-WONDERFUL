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
    auctionImages: {
      select: {
        id: true; // 이미지 ID
        urls: true; // 이미지 URL 배열
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

// 경매 상세 페이지
export type AuctionDetailItem = Prisma.AuctionItemGetPayload<{
  include: {
    // 판매자
    seller: {
      select: {
        id: true;
        nickname: true;
        profileImg: true;
        isVerified: true;
      };
    };
    // 카테고리
    category: {
      select: {
        id: true;
        name: true;
      };
    };
    // 가격
    auctionPrice: {
      select: {
        startPrice: true;
        currentPrice: true;
        instantPrice: true;
        minBidUnit: true;
        isInstantBuyEnabled: true;
        isExtendedAuction: true;
      };
    };
    auctionImages: {
      select: {
        id: true; // 이미지 ID
        urls: true; // 이미지 URL 배열
      };
    };
    // 통계
    _count: {
      select: {
        bids: true;
        favoriteItems: true;
      };
    };
  };
}>;
// 찜하기 여부
export interface UserFavoriteStatus {
  isFavorite: boolean;
}

// 이미지 배열 처리 헬퍼 함수 타입
export interface ProcessedImages {
  allImages: string[]; // 모든 이미지 URL 배열
  thumbnailUrl: string; // 대표 이미지 (첫 번째 이미지 또는 기본값)
}

// API 응답 타입들
// 경매 목록 응답
export interface AuctionListResponse {
  data: AuctionListItem[];
  total: number;
}

// 경매 상세페이지 응답
export interface AuctionDetailResponse {
  data: AuctionDetailItem;
  userFavorite: UserFavoriteStatus;
  currentUserId: string | null; // 현재 로그인한 사용자의 ID
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
