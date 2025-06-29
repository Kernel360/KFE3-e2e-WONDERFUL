export const auctionKeys = {
  all: ['auctions'] as const,

  // 경매 목록 조회 쿼리 키(무한스크롤)
  // location_is: 지역 필터, category_id: 카테고리 필터, sort: 정렬 기준
  lists: () => [...auctionKeys.all, 'list'] as const,
  list: (location_id?: string, category_id?: string, sort?: string) =>
    [...auctionKeys.lists(), location_id, category_id, sort] as const,
} as const;
