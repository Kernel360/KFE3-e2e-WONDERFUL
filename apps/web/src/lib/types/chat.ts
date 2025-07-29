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
  auctionId: string;
  createdAt: string;
  isDeleted: boolean;
  myRole: 'seller' | 'buyer';
  otherUser: {
    id: string;
    nickname: string;
  };
  auction: {
    id: string;
    title: string;
    thumbnailUrl: string | null;
    status: string;
  };
  messages: {
    id: string;
    content: string;
    sentAt: string;
    senderId: string;
  }[];
}

export interface ChatRoomsResponse {
  data: ChatRoom[];
  total: number;
}

export interface ChatUser {
  id: string;
  nickname: string;
  profile_img?: string;
  isOnline?: boolean;
}

export interface CreateChatRoomProps {
  auctionId: string;
  seller: { id: string; nickName: string };
}
