import apiClient from './client';

export interface SearchFilters {
  status?: 'all' | 'active' | 'completed';
  sort?: string;
}

export interface SearchPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
}

export interface SearchResponse {
  data: any[];
  pagination: SearchPagination;
  query: string;
}

// 경매 검색
export const searchAuctions = async (
  query: string,
  page: number = 1,
  filters?: SearchFilters
): Promise<SearchResponse> => {
  const params: Record<string, any> = {
    q: query,
    page: page.toString(),
    limit: '6',
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
