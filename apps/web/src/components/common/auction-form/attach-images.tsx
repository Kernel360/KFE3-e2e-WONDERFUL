'use client';

import { useEffect, useState } from 'react';

import AttacedImagesThumbnail from '@/components/common/auction-form/attach-images-thumbnail';
import AttachImagesInput from '@/components/common/auction-form/attach-images-input';

import deletePreviewImage from '@/hooks/auction/useDeletePreview';
import useOnChagePreview from '@/hooks/auction/useOnChangePreview';

interface ImagesUploaderProps {
  id: string;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const AttachImages = ({ id, setFiles }: ImagesUploaderProps) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imgLength, setImgLength] = useState<number>(0);

  const attachImageHandler = useOnChagePreview(setImgLength, setPreviewImages, setFiles);

  useEffect(() => {
    if (previewImages.length > 8) {
      alert('이미지는 최대 8개까지 등록할 수 있습니다.');
      setPreviewImages((prev) => prev.slice(0, 8)); // 8개까지만 유지
      setImgLength(8);
    }
  }, [previewImages]);

  return (
    <div className="flex h-20 items-center gap-2">
      <AttachImagesInput onChange={attachImageHandler} imgLength={imgLength} id={id} />
      <div className="scrollbar-hide-x flex w-full gap-1">
        {previewImages.length < 1
          ? ''
          : previewImages!.map((item, index) => {
              return (
                <AttacedImagesThumbnail
                  key={index}
                  url={item}
                  handleDelete={() =>
                    deletePreviewImage({ setImgLength, setPreviewImages, setFiles, index })
                  }
                />
              );
            })}
      </div>
    </div>
  );
};

export default AttachImages;
