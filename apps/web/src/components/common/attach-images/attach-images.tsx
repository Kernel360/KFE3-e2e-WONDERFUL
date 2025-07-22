'use client';

import { useState } from 'react';

import { AttachImagesInput, AttachImagesThumbnail } from '@/components/common';

import deletePreviewImage from '@/hooks/auction/useDeletePreview';
import useOnChangePreview from '@/hooks/auction/useOnChangePreview';

interface ImagesUploaderProps {
  id: string;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const AttachImages = ({ id, setFiles }: ImagesUploaderProps) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imgLength, setImgLength] = useState<number>(0);

  // 올바른 훅 사용법
  const { handleChange, syncCurrentFiles } = useOnChangePreview(
    setImgLength,
    setPreviewImages,
    setFiles
  );

  // 이미지 삭제 핸들러 (ref 동기화 포함)
  const handleDeleteImage = (index: number) => {
    deletePreviewImage({
      setImgLength,
      setPreviewImages,
      setFiles,
      index,
      onFilesChange: syncCurrentFiles, // ref 동기화 콜백 추가
    });
  };

  return (
    <div className="flex h-20 items-center gap-2">
      <AttachImagesInput onChange={handleChange} imgLength={imgLength} id={id} />
      <div className="scrollbar-hide-x flex w-full gap-1">
        {previewImages.length < 1
          ? ''
          : previewImages.map((item, index) => {
              return (
                <AttachImagesThumbnail
                  key={index}
                  url={item}
                  handleDelete={() => handleDeleteImage(index)}
                />
              );
            })}
      </div>
    </div>
  );
};

export default AttachImages;
