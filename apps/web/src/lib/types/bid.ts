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
  createdAt: string;
  bidder: BidderInfo;
}

export interface BidsListType {
  item_id: string;
  bids: BidType[];
}

//Bid-form props type
export interface BidBaseProps {
  auctionId: string;
  minBidUnit?: number; // 최소 입찰 단위
  currentPrice: number;
  endTime: string | Date; // 경매 종료 시간
  isExpired: boolean;
  isValid?: boolean; // 유효한 입찰단가로 입찰할 수 있는지 여부
  seller: { id: string; nickName: string };
  currentUserId?: string; // 현재 사용자 ID (선택적)
}

export interface BidFormProps extends BidBaseProps {
  bidTableRef: React.RefObject<HTMLDivElement | null>;
}

export interface BidInputProps {
  auctionId: string;
  currentPrice: number;
  minUnit: number;
  bidPrice: number | null;
  isBidInputOpen?: boolean;
  onChange: (price: number | null) => void;
  disabled?: boolean; // 비활성화 여부
  validationError?: string; // 검증 에러 메시지
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
