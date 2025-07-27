import { AuctionListItem } from '@/lib/types/auction-prisma';

export const PROFILE_PAGE_SIZE = 6;
// 프로필 페이지네이션
export interface ProfilePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
}

// 프로필 경매 응답
export interface ProfileAuctionResponse {
  data: AuctionListItem[];
  pagination: ProfilePagination;
}
