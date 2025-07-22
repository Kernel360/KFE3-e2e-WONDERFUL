export interface ChatMessage {
  id: string;
  room_id: string;
  sender_id: string;
  content: string | null;
  image_url: string | null;
  sent_at: string;
  // 추가 정보 (조인해서 가져올 수 있는 데이터)
  sender?: {
    id: string;
    nickname: string;
    profile_img?: string;
  };
}

export interface ChatRoom {
  id: string;
  auction_id: string;
  seller_id: string;
  buyer_id: string;
  room_type: string;
  created_at: string;
  last_message_at: string | null;
  is_deleted: boolean;
  // 추가 정보
  auction_item?: {
    id: string;
    title: string;
    thumbnail_url?: string;
  };
  seller?: {
    id: string;
    nickname: string;
  };
  buyer?: {
    id: string;
    nickname: string;
  };
}

export interface ChatUser {
  id: string;
  nickname: string;
  profile_img?: string;
  isOnline?: boolean;
}

export interface CreateChatRoomProps {
  auctionId: string;
  sellerId: string;
}
