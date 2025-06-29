import { getAuctions } from '@/lib/api/auction';
import { useQuery } from '@tanstack/react-query';
import { auctionKeys } from './keys';

// 경매 목록 조회 훅 (전체 목록)
export const useAuctions = (location_id?: string, category_id?: string, sort?: string) => {
  return useQuery({
    queryKey: auctionKeys.list(location_id, category_id, sort),
    queryFn: () => getAuctions(location_id, category_id, sort),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분간 캐시
  });
};

export type UseAuctionsReturn = ReturnType<typeof useAuctions>;
