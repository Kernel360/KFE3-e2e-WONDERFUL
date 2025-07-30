import apiClient from './client';

export interface NicknameCheckResponse {
  available: boolean;
  message: string;
}

// 닉네임 중복 확인
export const checkNickname = async (nickname: string): Promise<NicknameCheckResponse> => {
  const response = await apiClient.post('/users/nickname', { nickname });
  return response.data;
};
