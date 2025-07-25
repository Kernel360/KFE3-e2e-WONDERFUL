import { SearchFilters } from '@/lib/types/search';

export const searchKeys = {
  all: ['search'] as const,

  // 검색 쿼리 키
  searches: () => [...searchKeys.all, 'results'] as const,
  search: (query: string, filters?: SearchFilters) =>
    [...searchKeys.searches(), query, filters] as const,
} as const;
