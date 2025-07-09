export interface TabItem {
  id: string;
  name: string;
}

// 폴백용 카테고리 (API 에러시나 데이터 없을 때 사용)
export const FALLBACK_CATEGORIES: TabItem[] = [
  { id: 'all', name: '전체' },
  { id: '06ab1238-e817-4faf-9652-8dfa6eead9d4', name: '자동차/오토바이' },
  { id: '0920045d-c662-48b0-a503-c2e1eea0ac22', name: '의류/액세서리' },
  { id: '25052d9f-c32d-4206-88da-6130cedc0666', name: '카메라/영상' },
  { id: '32f83fa6-80be-43f6-880e-af187a9c6e80', name: '생활용품' },
  { id: '7c26ada6-c410-4b89-a008-faf4bfa56623', name: '전자제품' },
  { id: '8533037d-f684-4a39-bf64-b7f7765ec1a9', name: '스포츠/레저' },
  { id: '89f2b7b7-f8c4-4637-8005-54de5c963940', name: '도서/음반' },
  { id: '9734e870-1cfa-4c97-a584-58c99ab0bd07', name: '부품/소모품' },
];

// 경매 상태 타입
export type AuctionStatus = 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'EXPIRED';

// 탭 ID 타입
export type TabId = 'all' | 'ongoing' | 'completed' | 'cancelled';

// 각 탭에 매핑되는 상태들
export const TAB_STATUS_MAP: Record<TabId, AuctionStatus[]> = {
  all: ['ACTIVE', 'COMPLETED', 'CANCELLED', 'EXPIRED'],
  ongoing: ['ACTIVE'],
  completed: ['COMPLETED'],
  cancelled: ['CANCELLED', 'EXPIRED'],
} as const;

// 기본 탭 (3개) - 전체/경매중/경매완료
export const AUCTION_TABS_BASIC: Array<{ id: TabId; name: string }> = [
  { id: 'all', name: '전체' },
  { id: 'ongoing', name: '경매중' },
  { id: 'completed', name: '경매완료' },
];

// 확장 탭 (4개) - 전체/경매중/경매완료/취소&환불
export const AUCTION_TABS_EXTENDED: Array<{ id: TabId; name: string }> = [
  { id: 'all', name: '전체' },
  { id: 'ongoing', name: '경매중' },
  { id: 'completed', name: '경매완료' },
  { id: 'cancelled', name: '취소&환불' },
];

// 기존 호환성을 위해 유지
export const AUCTION_TABS = AUCTION_TABS_EXTENDED;
