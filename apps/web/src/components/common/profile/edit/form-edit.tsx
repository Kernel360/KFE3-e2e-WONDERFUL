'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

import { useUpdateProfile } from '@/hooks/mutations/profile';
import { useMyProfile } from '@/hooks/queries/profile';

import NicknameInput from './nickname';
import ProfileImageUploader from './profile-image-uploader';

const ProfileEditForm = () => {
  const { data: profile, isLoading } = useMyProfile(); // 프로필 데이터 가져오기

  const { mutate: updateProfileMutation, isPending } = useUpdateProfile();

  const [nickname, setNickname] = useState<string>('');
  const [profileImage, setProfileImage] = useState<File | null>(null);

  // 프로필 데이터 로드 시, 폼 필드 초기화
  useEffect(() => {
    if (profile) {
      setNickname(profile.nickname || '');
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nickname.trim()) return;

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
      <div className="mb-8 mt-auto px-4">
        <Button type="submit" fullWidth disabled={isPending}>
          {isPending ? '수정 중...' : '수정 완료'}
        </Button>
      </div>
    </form>
  );
};

export default ProfileEditForm;
