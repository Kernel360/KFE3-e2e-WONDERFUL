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

export type { BidType, BidsListType };
