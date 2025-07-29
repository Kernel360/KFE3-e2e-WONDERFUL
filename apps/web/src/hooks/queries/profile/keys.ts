import { AuctionStatus } from '@/types/filter';

export const profileKeys = {
  all: ['profile'] as const,

  // 판매 내역 관련 쿼리 키
  sales: (statuses?: AuctionStatus[]) => [...profileKeys.all, 'sales', statuses] as const,

  // 구매 내역 관련 쿼리 키
  purchases: (statuses?: AuctionStatus[]) => [...profileKeys.all, 'purchases', statuses] as const,

  // 찜 목록 관련 쿼리 키
  wishlist: (statuses?: AuctionStatus[]) => [...profileKeys.all, 'wishlist', statuses] as const,
} as const;
