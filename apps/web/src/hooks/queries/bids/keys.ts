// 입찰조회 쿼리 키 정의
export const bidKeys = {
  all: ['bids'] as const,
  lists: () => [...bidKeys.all, 'list'] as const,
  list: (auctionId: string, limits?: number) => [...bidKeys.lists(), auctionId, limits] as const,
};
