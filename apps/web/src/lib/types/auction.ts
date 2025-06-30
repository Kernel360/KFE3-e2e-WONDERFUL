export interface AuctionItemProps {
  id: string;
  title: string;
  status: '경매중' | '경매종료';
  originalPrice: number;
  currentPrice: number;
  deadline: string;
  thumbnailUrl: string;
}

// 필터 및 정렬 타입들
export interface AuctionPriceInput {
  start_price: number;
  instant_price: number;
  min_bid_unit: number;
}

export interface AuctionFormData {
  title: string;
  description: string;
  category_id: string | null;
  location_id: string | null;
  prices: AuctionPriceInput;
  start_time: string | null;
  end_time: string;
  auction_type?: 'normal' | 'flash';
  images: string[];
}

export interface Auction extends AuctionFormData {
  id: string;
  seller_id: string;
  status: AuctionStatus;
  thumbnail_url: string;
  created_at: string;
}

export type AuctionStatus =
  | 'pending'
  | 'ongoing'
  | 'ended'
  | 'sold'
  | 'canceled'
  | 'waiting'
  | 'live'
  | 'paused'
  | 'closed';
