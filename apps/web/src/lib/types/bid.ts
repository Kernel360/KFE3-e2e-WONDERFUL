export interface BidderInfo {
  id: string;
  nickname: string;
  profileImg: string | null;
}

export interface BidType {
  id: string;
  item_id: string;
  bidder_id: string;
  price: string;
  createdAt: Date | string;
  bidder: BidderInfo;
}

export interface BidsListType {
  item_id: string;
  bids: BidType[];
}

//Bid-form props type
export interface BidBaseProps {
  auctionId: string;
  currentPrice: number;
  endTime: string | Date; // 경매 종료 시간
  isExpired: boolean;
}

export interface BidFormProps extends BidBaseProps {
  bidTableRef: React.RefObject<HTMLDivElement | null>;
}

export interface BidInputProps {
  currentPrice: number;
  minUnit: number;
  bidPrice: number | null;
  isBidInputOpen?: boolean;
  onChange: (price: number | null) => void;
  disabled?: boolean; // 추가: 비활성화 여부
}

// 입찰 목록 조회 응답 타입
export interface BidListResponse {
  success: boolean;
  data: BidType[];
  message?: string;
}

// 입찰 생성 응답 타입
export interface BidCreateResponse {
  success: boolean;
  data: BidType;
  message: string;
}
