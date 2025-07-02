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
];
