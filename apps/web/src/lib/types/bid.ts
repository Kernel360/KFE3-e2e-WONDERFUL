import { Dispatch, SetStateAction } from 'react';

interface BidType {
  bid_id: string;
  bidder_id: string;
  nickname: string;
  price: string;
}

interface BidsListType {
  item_id: string;
  bids: BidType[];
}

//Bid-form props type
interface BidBaseProps {
  auctionId: string;
  currentPrice: number;
  endTime: string | Date; // 경매 종료 시간
  bidTableRef: React.RefObject<HTMLDivElement | null>;
}

interface BidFormBottomProps extends BidBaseProps {
  isExpired: boolean;
  isBidding: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
}

interface BidInputProps {
  currentPrice: number;
  minUnit: number;
  bidPrice: number | null;
  isBidding: boolean;
  onChange: (price: number | null) => void;
}

export type { BidType, BidsListType, BidInputProps, BidFormBottomProps, BidBaseProps };
