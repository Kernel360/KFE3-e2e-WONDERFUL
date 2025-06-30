import React from 'react';

import { ImageUp } from 'lucide-react';

import { AttachImageInputProps } from '@/lib/types/auction';

const AttachImageInput = ({ onChange, imgLength, id }: AttachImageInputProps) => {
  const handleButtonClick = () => {
    const fileInput = document.getElementById(id) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="w-fit">
      <input
        type="file"
        id={id}
        name={id}
        className="hidden"
        onChange={onChange}
        multiple
        accept="image/*"
      />
      <button
        onClick={handleButtonClick}
        className="flex h-16 w-16 flex-col items-center justify-center gap-0.5 rounded-md border border-neutral-200 text-neutral-600"
      >
        <ImageUp />
        <p className="text-min font-medium">{imgLength}/8</p>
      </button>
    </div>
  );
};

export default AttachImageInput;
