import { useInfiniteQuery } from '@tanstack/react-query';

import { searchAuctions } from '@/lib/api/search';
import { SearchFilters } from '@/lib/types/search';

import { searchKeys } from './keys';

//검색 훅
export const useSearch = (query: string, filters?: SearchFilters, enabled: boolean = true) => {
  return useInfiniteQuery({
    queryKey: searchKeys.search(query, filters),
    queryFn: ({ pageParam = 1 }) => searchAuctions(query, pageParam, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasNext ? lastPage.pagination.page + 1 : undefined;
    },
    staleTime: 1000 * 60 * 2, // 2분
    gcTime: 1000 * 60 * 10, // 10분간 캐시
    enabled: enabled && !!query?.trim(), // 검색어가 있고 enabled가 true일 때만 실행
  });
};

export type UseSearchReturn = ReturnType<typeof useSearch>;
