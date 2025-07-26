// 검색 관련 타입 정의들

// 검색 기록 아이템
export interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: number;
}

// 검색 필터
export interface SearchFilters {
  status?: 'all' | 'active' | 'completed';
  sort?: string;
}

// 검색 페이지네이션
export interface SearchPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
}

// 검색 API 응답
export interface SearchResponse {
  data: any[];
  pagination: SearchPagination;
  query: string;
}

// 검색 탭 상태 타입
export type SearchTabStatus = 'all' | 'active' | 'completed';
