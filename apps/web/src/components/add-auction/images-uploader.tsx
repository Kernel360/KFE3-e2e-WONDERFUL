'use client';

import { useEffect, useState } from 'react';

import AttacedAuctionPreview from '@/components/add-auction/add-auction-thumbnail';
import AttachImageInput from '@/components/add-auction/attache-image-input';

import deletePreviewImage from '@/hooks/auction/useDeletePreview';
import useOnChagePreview from '@/hooks/auction/useOnChangePreview';

const ImagesUploader = ({ id }: { id: string }) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imgLength, setImgLength] = useState<number>(0);

  const attachImageHandler = useOnChagePreview(setImgLength, setPreviewImages);

  useEffect(() => {
    if (previewImages.length > 8) {
      alert('이미지는 최대 8개까지 등록할 수 있습니다.');
      setPreviewImages((prev) => prev.slice(0, 8)); // 8개까지만 유지
      setImgLength(8);
    }
  }, [previewImages]);

  return (
    <div className="flex h-20 items-center gap-2">
      <AttachImageInput onChange={attachImageHandler} imgLength={imgLength} id={id} />
      <div className="scrollbar-hide-x flex w-full gap-1">
        {previewImages.length < 1
          ? ''
          : previewImages!.map((item, index) => {
              return (
                <AttacedAuctionPreview
                  key={index}
                  url={item}
                  handleDelete={() => deletePreviewImage({ setImgLength, setPreviewImages, index })}
                />
              );
            })}
      </div>
    </div>
  );
};

export default ImagesUploader;
