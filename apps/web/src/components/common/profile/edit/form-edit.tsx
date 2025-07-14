'use client';

import { Button } from '@/components/ui/button';

import ImageUploader from './image-uploader';
import NicknameInput from './nickname';

export default function ProfileEditForm() {
  const handleClick = () => {
    console.log('수정 완료');
  };

  return (
    <form className="flex flex-1 flex-col">
      <ImageUploader />
      <NicknameInput />
      <div className="mb-8 mt-auto px-4">
        <Button type="button" fullWidth onClick={handleClick}>
          수정 완료
        </Button>
      </div>
    </form>
  );
}
