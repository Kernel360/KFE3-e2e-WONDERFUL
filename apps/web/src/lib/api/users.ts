import { prisma } from '@repo/db';

import apiClient from '@/lib/api/client';
import { UserProfile } from '@/lib/types/users';

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

// DAL (Data Access Layer) 함수
export const getUserProfileFromDB = async (userId: string): Promise<UserProfile | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        phone: true,
        isVerified: true,
        profileImg: true,
        nickname: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) return null;

    return {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt?.toISOString(),
    };
  } catch (error) {
    console.error('DB 프로필 조회 에러:', error);
    throw new Error('프로필 조회 실패');
  }
};
