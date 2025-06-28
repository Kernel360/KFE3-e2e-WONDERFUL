// 사용자 관련 타입만
export interface User {
  id: string;
  email: string;
  phone?: string;
  is_verified: boolean;
  profile_img?: string;
  nickname: string;
  created_at: string;
  updated_at?: string;
}

export interface UsersResponse {
  success: boolean;
  userCount: number;
  message: string;
  data: User[];
}
