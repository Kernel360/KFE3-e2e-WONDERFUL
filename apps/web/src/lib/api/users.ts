import apiClient from '@/lib/api/client';

// 사용자 목록 조회
export const getUsers = async () => {
  const response = await apiClient.get('/users');
  return response.data;
};

// 사용자 프로필 조회
export const getUserProfile = async (userId: string) => {
  const response = await apiClient.get(`/users/${userId}`);
  return response.data;
};
