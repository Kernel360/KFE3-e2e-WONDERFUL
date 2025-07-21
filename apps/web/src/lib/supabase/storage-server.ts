'use server';

import { createClient } from './server';

// 서버 액션 전용 프로필 이미지 업로드
export const uploadProfileImageServer = async (file: File, userId: string): Promise<string> => {
  try {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const fileExt = file.name.split('.').pop();
    const fileName = `profile-${timestamp}_${randomStr}.${fileExt}`;

    // 프로필 이미지는 사용자별 폴더에 저장
    const filePath = `${userId}/${fileName}`;

    console.log('서버 업로드 시도:', { filePath, fileSize: file.size, userId });

    // 서버 클라이언트 생성 (인증 정보 포함)
    const supabase = await createClient();

    // profile-images 버킷 사용
    const { data, error } = await supabase.storage.from('profile-images').upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      console.error('Supabase 업로드 에러:', error);
      throw new Error(`이미지 업로드 실패: ${error.message}`);
    }

    console.log('업로드 성공:', data);

    // 공개 URL 생성
    const { data: urlData } = supabase.storage.from('profile-images').getPublicUrl(data.path);

    console.log('생성된 URL:', urlData.publicUrl);

    return urlData.publicUrl;
  } catch (error) {
    console.error('프로필 이미지 업로드 에러:', error);
    throw new Error(
      `프로필 이미지 업로드 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`
    );
  }
};
