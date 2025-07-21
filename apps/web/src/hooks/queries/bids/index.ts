import { useQuery } from '@tanstack/react-query';

import { getBidsByAuction } from '@/lib/api/bid';

import { bidKeys } from './keys';

// 특정 경매의 입찰목록 조회 훅
export const useBidsByAuction = (auctionId: string, limits?: number) => {
  return useQuery({
    queryKey: bidKeys.list(auctionId, limits),
    queryFn: () => getBidsByAuction(auctionId, limits),
    staleTime: 1000 * 30, // 30초
    gcTime: 1000 * 60 * 5, // 5분간 캐시
    enabled: !!auctionId, // auctionId가 있을 때만 쿼리 실행
  });
};

export type UseBidsByAuctionReturn = ReturnType<typeof useBidsByAuction>;
