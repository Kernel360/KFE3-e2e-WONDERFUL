import React, { useRef, useState } from 'react';

import { Pencil } from 'lucide-react';

import ProfileImage from '../image';

const DEFAULT_IMAGE =
  'https://autkdwezfwdduoqiadsc.supabase.co/storage/v1/object/public/auction-images/0bf0d884-38e1-4cf9-8663-5f65d0685233/1751631153830_jfii5z.jpeg';

const ProfileImageUploader = ({
  onChange,
  id = 'profile-image-upload',
  defaultImage = DEFAULT_IMAGE,
}: {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  id?: string;
  defaultImage?: string;
}) => {
  const [preview, setPreview] = useState<string>(defaultImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative mb-4 mt-8 flex flex-col items-center">
      <div className="relative">
        <ProfileImage src={preview} alt="프로필 이미지" className="size-[150px]" />
        <input
          type="file"
          id={id}
          name={id}
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
        />
        <button
          type="button"
          onClick={handleButtonClick}
          className="absolute -bottom-1 -right-1 flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-neutral-300"
          aria-label="프로필 이미지 변경"
        >
          <Pencil className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ProfileImageUploader;
