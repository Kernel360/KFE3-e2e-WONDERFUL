export interface TabItem {
  id: string;
  name: string;
}

// 폴백용 카테고리 (API 에러시나 데이터 없을 때 사용)
export const FALLBACK_CATEGORIES: TabItem[] = [
  { id: '', name: '전체' },
  { id: 'auto', name: '자동차/오토바이' },
  { id: 'clothes', name: '의류/액세서리' },
  { id: 'camera', name: '카메라/영상' },
  { id: 'household', name: '생활용품' },
  { id: 'electronics', name: '전자제품' },
  { id: 'sports', name: '스포츠/레저' },
  { id: 'books', name: '도서/음반' },
  { id: 'parts', name: '부품/소모품' },
];
