'use client';

import { Button } from '@/components/ui/button';

import NicknameInput from './nickname';
import ProfileImageUploader from './profile-image-uploader';

const ProfileEditForm = () => {
  const handleClick = () => {
    console.log('수정 완료');
  };

  return (
    <form className="flex flex-1 flex-col">
      <ProfileImageUploader />
      <NicknameInput />
      <div className="mb-8 mt-auto px-4">
        <Button type="button" fullWidth onClick={handleClick}>
          수정 완료
        </Button>
      </div>
    </form>
  );
};

export default ProfileEditForm;
