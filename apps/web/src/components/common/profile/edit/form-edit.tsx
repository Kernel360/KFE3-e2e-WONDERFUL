'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

import { useUpdateProfile } from '@/hooks/mutations/profile';
import { useMyProfile } from '@/hooks/queries/profile';

import { useToastStore } from '@/lib/zustand/store/toast-store';

import NicknameInput from './nickname';
import ProfileImageUploader from './profile-image-uploader';

const ProfileEditForm = () => {
  const { data: profile, isLoading } = useMyProfile(); // 프로필 데이터 가져오기

  const { showToast } = useToastStore(); // 토스트 store

  const {
    mutate: updateProfileMutation,
    isPending,
    isSuccess,
    isError,
    error,
  } = useUpdateProfile();

  const [nickname, setNickname] = useState<string>('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [nicknameError, setNicknameError] = useState<string>('');

  // 프로필 데이터 로드 시, 폼 필드 초기화
  useEffect(() => {
    if (profile) {
      setNickname(profile.nickname || '');
      setNicknameError('');
    }
  }, [profile]);

  // mutation 결과에 따른 토스트 표시
  useEffect(() => {
    if (isSuccess) {
      showToast({
        status: 'success',
        title: '프로필 수정 완료',
        subtext: '변경사항이 성공적으로 저장되었어요!',
        autoClose: true,
      });
    }
  }, [isSuccess, showToast]);

  useEffect(() => {
    if (isError) {
      showToast({
        status: 'error',
        title: '프로필 수정 실패',
        subtext: error?.message || '잘못된 형식입니다.',
        autoClose: true,
      });
    }
  }, [isError, error, showToast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 닉네임 필드가 비어 있을 때 오류 메시지 추가
    if (!nickname.trim()) {
      setNicknameError('닉네임을 입력해주세요.');

      showToast({
        status: 'error',
        title: '입력 오류',
        subtext: '닉네임을 입력해주세요.',
        autoClose: true,
      });

      return;
    }
    setNicknameError('');

    const formData = new FormData();
    formData.append('nickname', nickname.trim());

    if (profileImage) {
      formData.append('profileImg', profileImage); // 서버 액션 키: 'profileImg'
    }

    updateProfileMutation(formData);
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div>로딩 중...</div>
      </div>
    );
  }

  return (
    <form className="flex flex-1 flex-col" onSubmit={handleSubmit}>
      <ProfileImageUploader
        defaultImage={profile?.profileImg || ''}
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          setProfileImage(file || null);
        }}
      />
      <NicknameInput value={nickname} onChange={(e) => setNickname(e.target.value)} />
      {nicknameError && <div className="px-7 text-sm text-red-500">{nicknameError}</div>}
      <div className="mb-8 mt-auto px-4">
        <Button type="submit" fullWidth disabled={isPending}>
          {isPending ? '수정 중...' : '수정 완료'}
        </Button>
      </div>
    </form>
  );
};

export default ProfileEditForm;
