import { SEARCH_PAGE_SIZE } from '@/lib/constants/search';
import { SearchFilters, SearchResponse } from '@/lib/types/search';

import apiClient from './client';

// 경매 검색 (페이지네이션)
export const searchAuctions = async (
  query: string,
  page: number = 1,
  filters?: SearchFilters
): Promise<SearchResponse> => {
  const params: Record<string, any> = {
    q: query,
    page: page.toString(),
    limit: SEARCH_PAGE_SIZE.toString(),
  };

  if (filters?.status && filters.status !== 'all') {
    params.status = filters.status;
  }

  if (filters?.sort) {
    params.sort = filters.sort;
  }

  const response = await apiClient.get('/search', { params });
  return response.data;
};
