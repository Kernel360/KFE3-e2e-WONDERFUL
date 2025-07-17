'use server';
import { getCurrentUser } from '@/lib//utils/auth';
import { getUserProfileFromDB } from '@/lib/data/user';

export const getMyProfile = async () => {
  try {
    // 현재 인증된 사용자 가져오기
    const user = await getCurrentUser();
    if (!user) {
      throw new Error('로그인이 필요합니다.');
    }
    // 사용자 ID를 사용하여 프로필 조회
    const profile = await getUserProfileFromDB(user.id); // DB에서 프로필 조회
    if (!profile) {
      throw new Error('프로필을 찾을 수 없습니다.');
    }
    return profile;
  } catch (error) {
    console.error('내 프로필 조회 에러:', error);
    throw new Error('내 프로필 조회 실패');
  }
};
