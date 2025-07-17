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

// 사용자 프로필 응답 타입
export interface UserProfile {
  id: string;
  email: string;
  phone: string | null;
  isVerified: boolean;
  profileImg: string | null;
  nickname: string | null;
  createdAt: string;
  updatedAt?: string;
}

// 에러 응답 타입
export interface ErrorResponse {
  error: string;
}
