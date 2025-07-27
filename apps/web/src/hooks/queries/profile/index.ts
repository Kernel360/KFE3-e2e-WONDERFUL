import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

import { getMyProfile } from '@/lib/actions/profile';
import { getMySales, getMyPurchases, getMyWishlist } from '@/lib/api/profile';

import { AuctionStatus } from '@/types/filter';

import { profileKeys } from './keys';
// 내 프로필 조회 훅
export const useMyProfile = () => {
  return useQuery({
    queryKey: ['profile', 'me'],
    queryFn: getMyProfile,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });
};

// 내가 등록한 경매 목록 조회 훅
export const useMySales = (statuses?: AuctionStatus[]) => {
  return useInfiniteQuery({
    queryKey: profileKeys.sales(statuses),
    queryFn: ({ pageParam = 1 }) => getMySales(statuses, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasNext ? lastPage.pagination.page + 1 : undefined;
    },
    staleTime: 1000 * 60 * 2, // 2분
    gcTime: 1000 * 60 * 10, // 10분간 캐시
  });
};

// 내가 입찰한 경매 목록 조회 훅
export const useMyPurchases = (statuses?: AuctionStatus[]) => {
  return useInfiniteQuery({
    queryKey: profileKeys.purchases(statuses),
    queryFn: ({ pageParam = 1 }) => getMyPurchases(statuses, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasNext ? lastPage.pagination.page + 1 : undefined;
    },
    staleTime: 1000 * 60 * 2, // 2분
    gcTime: 1000 * 60 * 10, // 10분간 캐시
  });
};

// 내가 찜한 경매 목록 조회 훅
export const useMyWishlist = (statuses?: AuctionStatus[]) => {
  return useInfiniteQuery({
    queryKey: profileKeys.wishlist(statuses),
    queryFn: ({ pageParam = 1 }) => getMyWishlist(statuses, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasNext ? lastPage.pagination.page + 1 : undefined;
    },
    staleTime: 1000 * 60 * 2, // 2분
    gcTime: 1000 * 60 * 10, // 10분간 캐시
  });
};

export type UseMySalesReturn = ReturnType<typeof useMySales>;
export type UseMyPurchasesReturn = ReturnType<typeof useMyPurchases>;
export type UseMyWishlistReturn = ReturnType<typeof useMyWishlist>;
