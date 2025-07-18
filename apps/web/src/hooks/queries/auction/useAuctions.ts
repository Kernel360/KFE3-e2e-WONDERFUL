import { useQuery } from '@tanstack/react-query';

import { getAuctionDetail, getAuctions } from '@/lib/api/auction';

import { auctionKeys } from './keys';

// 경매 목록 조회 훅 (전체 목록)
export const useAuctions = (
  location_id?: string,
  category_id?: string,
  sort?: string,
  includeCompleted?: boolean
) => {
  return useQuery({
    queryKey: auctionKeys.list(location_id, category_id, sort, includeCompleted),
    queryFn: () => getAuctions(location_id, category_id, sort, includeCompleted),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분간 캐시
  });
};

// 경매 상세페이지 조회 훅
export const useAuctionDetail = (id: string, userId?: string) => {
  return useQuery({
    queryKey: auctionKeys.detail(id, userId),
    queryFn: () => getAuctionDetail(id, userId),
    staleTime: 1000 * 60 * 2, // 2분 (상세는 더 자주 업데이트)
    gcTime: 1000 * 60 * 10, // 10분간 캐시
    enabled: !!id, // id가 있을 떄만 실행
  });
};

export type UseAuctionsReturn = ReturnType<typeof useAuctions>;
export type useAuctionDetailReturn = ReturnType<typeof useAuctionDetail>;
