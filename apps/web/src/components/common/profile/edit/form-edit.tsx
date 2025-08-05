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
  const [isNicknameValid, setIsNicknameValid] = useState<boolean>(true);

  useEffect(() => {
    if (profile) {
      setNickname(profile.nickname || '');
      setNicknameError('');
      setIsNicknameValid(true);
    }
  }, [profile]);

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
      formData.append('profileImg', profileImage);
    }

    updateProfileMutation(formData);
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center gap-8 p-12">
        <div className="flex size-36 animate-pulse flex-col rounded-full bg-neutral-200" />
        <div className="flex h-12 w-full animate-pulse flex-col rounded-xl bg-neutral-200" />
      </div>
    );
  }

  return (
    <form className="flex flex-1 flex-col p-4" onSubmit={handleSubmit}>
      <ProfileImageUploader
        defaultImage={profile?.profileImg || ''}
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          setProfileImage(file || null);
        }}
      />

      <NicknameInput
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        onValidationChange={handleNicknameValidationChange}
        error={nicknameError}
        initialValue={profile?.nickname}
        className="p-4"
      />

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
