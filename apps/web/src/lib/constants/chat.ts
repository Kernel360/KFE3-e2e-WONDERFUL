export interface ChatRoom {
  id: string; // UUID
  auction_id: string;
  auction_title: string;
  last_message: string | null;
  last_message_at: string; // ISO timestamp
  opponent_id: string; // 상대방 user uuid
  opponent_nickname: string;
  opponent_profile_img: string | null;
}

const PREVIEWCHATS: ChatRoom[] = [
  {
    id: '1',
    auction_id: '1',
    auction_title: '빛나는 아이폰 부품',
    last_message: '저 살게요',
    last_message_at: '2025-06-28T07:45:12.345Z',
    opponent_id: '1',
    opponent_nickname: '아이폰판매상',
    opponent_profile_img: null,
  },
  {
    id: '2',
    auction_id: '2',
    auction_title: '어제 빠진 머리카락',
    last_message: '이런 거 왜 파세요?',
    last_message_at: '2025-06-28T08:10:05.789Z',
    opponent_id: '2',
    opponent_nickname: '머리카락수집가',
    opponent_profile_img: null,
  },
  {
    id: '3',
    auction_id: '3',
    auction_title: '중고 에어팟 한 쪽',
    last_message: '한 쪽만 살 순 없나요?',
    last_message_at: '2025-06-28T08:25:45.123Z',
    opponent_id: '3',
    opponent_nickname: '에어팟헌터',
    opponent_profile_img: null,
  },
  {
    id: '4',
    auction_id: '4',
    auction_title: '불타버린 교과서',
    last_message: '상태가 별로네요',
    last_message_at: '2025-06-28T09:00:00.000Z',
    opponent_id: '4',
    opponent_nickname: '교과서애호가',
    opponent_profile_img: null,
  },
  {
    id: '5',
    auction_id: '5',
    auction_title: '부서진 키보드',
    last_message: '이거 고칠 수 있을까요?',
    last_message_at: '2025-06-28T09:15:30.456Z',
    opponent_id: '5',
    opponent_nickname: '기계식수리공',
    opponent_profile_img: null,
  },
  {
    id: '6',
    auction_id: '6',
    auction_title: '반쯤 먹다 남긴 과자',
    last_message: '유통기한 괜찮나요?',
    last_message_at: '2025-06-28T09:30:12.789Z',
    opponent_id: '6',
    opponent_nickname: '스낵연구원',
    opponent_profile_img: null,
  },
  {
    id: '7',
    auction_id: '7',
    auction_title: '녹슨 자전거 벨',
    last_message: '소리가 잘 나나요?',
    last_message_at: '2025-06-28T09:45:55.321Z',
    opponent_id: '7',
    opponent_nickname: '자전거덕후',
    opponent_profile_img: null,
  },
  {
    id: '8',
    auction_id: '8',
    auction_title: '한쪽만 있는 장갑',
    last_message: '짝이 없나요?',
    last_message_at: '2025-06-28T10:00:40.654Z',
    opponent_id: '8',
    opponent_nickname: '장갑수집가',
    opponent_profile_img: null,
  },
  {
    id: '9',
    auction_id: '9',
    auction_title: '찌그러진 주전자',
    last_message: '물이 새지 않나요?',
    last_message_at: '2025-06-28T10:15:22.987Z',
    opponent_id: '9',
    opponent_nickname: '빈티지연구소',
    opponent_profile_img: null,
  },
  {
    id: '10',
    auction_id: '10',
    auction_title: '의문의 돌멩이',
    last_message: '이거 진짜 돌인가요?',
    last_message_at: '2025-06-28T10:30:10.111Z',
    opponent_id: '10',
    opponent_nickname: '돌감정사',
    opponent_profile_img: null,
  },
] as const;

export { PREVIEWCHATS };
