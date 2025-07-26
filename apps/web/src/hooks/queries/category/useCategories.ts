import { useQuery } from '@tanstack/react-query';

import { getCategories } from '@/lib/api/category';

// 카테고리 쿼리 키
export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
} as const;

// 카테고리 목록 조회 훅
export const useCategories = () => {
  return useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: getCategories,
    enabled: typeof window !== 'undefined', // 클라이언트에서만 실행
    staleTime: 1000 * 60 * 10, // 10분 (카테고리는 자주 변경되지 않음)
    gcTime: 1000 * 60 * 60, // 1시간간 캐시
  });
};

export type UseCategoriesReturn = ReturnType<typeof useCategories>;
