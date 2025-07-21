import apiClient from './client';

// 사용자 프로필 조회
export const getUserProfile = async (userId: string) => {
  const response = await apiClient.get(`/users/${userId}`);
  return response.data;
};
