'use server';
import { revalidatePath } from 'next/cache';

import { prisma } from '@repo/db';

import { getUserProfileFromDB } from '@/lib/data/user';
import { uploadProfileImageServer } from '@/lib/supabase/storage-server';
import { getCurrentUser } from '@/lib/utils/auth';

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

export const updateProfile = async (formData: FormData) => {
  try {
    // 현재 사용자 확인
    const user = await getCurrentUser();
    if (!user) {
      throw new Error('로그인이 필요합니다.');
    }

    console.log('현재 사용자: ', user.id);

    const nickname = formData.get('nickname') as string;
    const profileImage = formData.get('profileImg') as File | null;

    console.log('받은 데이터: ', {
      nickname,
      hasImage: !!profileImage,
      imageSize: profileImage?.size,
    });

    // 닉네임 중복 체크 (현재 사용자 제외)
    const existingUser = await prisma.user.findFirst({
      where: {
        nickname,
        id: {
          not: user.id,
        },
      },
    });

    if (existingUser) {
      throw new Error('이미 사용 중인 닉네임입니다.');
    }

    let profileImgUrl: string | undefined;

    // 이미지 업로드 처리
    if (profileImage && profileImage.size > 0) {
      console.log('이미지 업로드 시작');
      profileImgUrl = await uploadProfileImageServer(profileImage, user.id);
      console.log('이미지 업로드 완료:', profileImgUrl);
    }

    // 프로필 업데이트
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        nickname,
        ...(profileImgUrl && { profileImg: profileImgUrl }),
        updatedAt: new Date(),
      },
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

    console.log('DB 업데이트 완료:', updatedUser);

    // 캐시 무효화
    revalidatePath('/profile');
    revalidatePath('/profile/edit');

    return {
      success: true,
      data: {
        ...updatedUser,
        createdAt: updatedUser.createdAt.toISOString(),
        updatedAt: updatedUser.updatedAt?.toISOString(),
      },
    };
  } catch (error) {
    console.error('프로필 업데이트 에러:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '프로필 업데이트 실패',
    };
  }
};
