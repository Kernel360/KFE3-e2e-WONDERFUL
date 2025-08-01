'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

import { useUpdateProfile } from '@/hooks/mutations/profile';
import { useMyProfile } from '@/hooks/queries/profile';

import { useToastStore } from '@/lib/zustand/store';

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
  const [isNicknameValid, setIsNicknameValid] = useState<boolean>(true); // 닉네임 유효성 상태

  // 프로필 데이터 로드 시, 폼 필드 초기화
  useEffect(() => {
    if (profile) {
      setNickname(profile.nickname || '');
      setNicknameError('');
      setIsNicknameValid(true); // 기존 닉네임은 유효한 것으로 처리
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

  const handleNicknameValidationChange = (isValid: boolean) => {
    setIsNicknameValid(isValid);
    if (isValid) {
      setNicknameError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
    <form className="flex flex-1 flex-col px-4 py-4" onSubmit={handleSubmit}>
      <ProfileImageUploader
        defaultImage={profile?.profileImg || ''}
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          setProfileImage(file || null);
        }}
      />

      <div className="px-4 py-4">
        <NicknameInput
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onValidationChange={handleNicknameValidationChange}
          error={nicknameError}
          initialValue={profile?.nickname}
        />
      </div>

      <div className="absolute bottom-0 left-0 z-10 w-full bg-white px-8 pb-6">
        <Button
          type="submit"
          form="profile-edit-form"
          fullWidth
          disabled={isPending || !isNicknameValid}
        >
          {isNicknameValid ? (isPending ? '수정 중...' : '프로필 수정') : '닉네임 중복 체크'}
        </Button>
      </div>
    </form>
  );
};

export default ProfileEditForm;
