// 검색 관련 상수들

// 무한스크롤
export const SEARCH_PAGE_SIZE = 6;

// 로컬스토리지
export const SEARCH_HISTORY_MAX_SIZE = 10;
export const SEARCH_HISTORY_STORAGE_KEY = 'auction_search_history';

// 검색 탭 ID를 API 상태 파라미터로 매핑
export const SEARCH_TAB_TO_STATUS_MAP = {
  all: 'all',
  ongoing: 'active',
  completed: 'completed',
} as const;
