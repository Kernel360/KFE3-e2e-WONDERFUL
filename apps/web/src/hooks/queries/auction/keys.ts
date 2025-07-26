export const auctionKeys = {
  all: ['auctions'] as const,

  // 경매 목록 조회 쿼리 키
  // location_id: 지역 필터, category_id: 카테고리 필터, sort: 정렬 기준, includeCompleted: 종료된 경매 포함 여부
  lists: () => [...auctionKeys.all, 'list'] as const,
  list: (location_id?: string, category_id?: string, sort?: string, includeCompleted?: boolean) =>
    [...auctionKeys.lists(), location_id, category_id, sort, includeCompleted] as const,

  // 경매 상세 페이지 조회 쿼리 키
  details: () => [...auctionKeys.all, 'detail'] as const,
  detail: (id: string) => [...auctionKeys.details(), id] as const,
} as const;
