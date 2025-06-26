interface AuctionItemProps {
  id: string;
  title: string;
  status: '경매중' | '경매종료';
  originalPrice: number;
  currentPrice: number;
  deadline: string;
  thumbnailUrl: string;
}

export type { AuctionItemProps };
