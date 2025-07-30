import { useQuery } from '@tanstack/react-query';

import { getAuctionDetail, getAuctions, getLocationById } from '@/lib/api/auction';

import { auctionKeys } from './keys';

// 경매 목록 조회 훅 (전체 목록)
export const useAuctions = (
  locationName?: string,
  category_id?: string,
  sort?: string,
  includeCompleted?: boolean
) => {
  return useQuery({
    queryKey: auctionKeys.list(locationName, category_id, sort, includeCompleted),
    queryFn: () => getAuctions(locationName, category_id, sort, includeCompleted),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분간 캐시
  });
};

// 경매 상세페이지 조회 훅
export const useAuctionDetail = (id: string) => {
  return useQuery({
    queryKey: auctionKeys.detail(id),
    queryFn: () => getAuctionDetail(id),
    staleTime: 1000 * 60 * 2, // 2분 (상세는 더 자주 업데이트)
    gcTime: 1000 * 60 * 10, // 10분간 캐시
    enabled: !!id, // id가 있을 떄만 실행
  });
};

// 찜 상태만 조회하는 훅 (ButtonFavorite 컴포넌트에서 사용)
export const useFavoriteStatus = (auctionId: string) => {
  return useQuery({
    queryKey: auctionKeys.detail(auctionId),
    queryFn: () => getAuctionDetail(auctionId),
    select: (data) => data?.userFavorite?.isFavorite || false, // 찜 상태만 선택
    staleTime: 1000 * 60 * 2, // 2분
    gcTime: 1000 * 60 * 10, // 10분간 캐시
    enabled: !!auctionId, // auctionId가 있을 때만 실행
  });
};

// 위치 정보 조회 훅
export const useLocationById = (locationId: string) => {
  return useQuery({
    queryKey: auctionKeys.location(locationId!),
    queryFn: () => getLocationById(locationId!),
    enabled: !!locationId, // locationId가 있을 때만 실행
    staleTime: 1000 * 60 * 10, // 10분
    gcTime: 1000 * 60 * 30, // 30분간 캐시
  });
};

export type UseAuctionsReturn = ReturnType<typeof useAuctions>;
export type UseAuctionDetailReturn = ReturnType<typeof useAuctionDetail>;
export type UseFavoriteStatusReturn = ReturnType<typeof useFavoriteStatus>;
export type UseLocationByIdReturn = ReturnType<typeof useLocationById>;
