import { AuctionListResponse } from '@/types/auction-prisma';

import apiClient from './client';

export interface SearchFilters {
  status?: 'all' | 'active' | 'completed';
  sort?: string;
}

export interface SearchResponse extends AuctionListResponse {
  query: string;
}

// 경매 검색
export const searchAuctions = async (
  query: string,
  filters?: SearchFilters
): Promise<SearchResponse> => {
  const params: Record<string, any> = {
    q: query,
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
