'use client';

import { useState } from 'react';

import { AttachImagesInput, AttachImagesThumbnail } from '@/components/common';

import deletePreviewImage from '@/hooks/auction/useDeletePreview';
import useOnChangePreview from '@/hooks/auction/useOnChangePreview';

interface ImagesUploaderProps {
  id: string;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  existingImages?: string[]; // 기존 이미지 URL 배열
  isEdit?: boolean; // 수정 모드 여부
  onRemoveExistingImage?: (imageUrl: string) => void; // 기존 이미지 삭제 콜백
}

const AttachImages = ({
  id,
  setFiles,
  existingImages = [],
  isEdit = false,
  onRemoveExistingImage,
}: ImagesUploaderProps) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const currentImgLength = previewImages.length;

  // 새 이미지만 처리
  const { handleChange, syncCurrentFiles } = useOnChangePreview(
    (length) => {},
    setPreviewImages,
    setFiles
  );

  // 새 이미지 삭제 핸들러
  const handleDeleteNewImage = (index: number) => {
    deletePreviewImage({
      setImgLength: () => {},
      setPreviewImages,
      setFiles,
      index,
      onFilesChange: syncCurrentFiles, // ref 동기화 콜백 추가
    });
  };

  // 기존 이미지 삭제 핸들러
  const handleDeleteExistingImage = (imageUrl: string) => {
    console.log('🗑️ 기존 이미지 삭제 시도:', imageUrl);
    console.log('🗑️ 현재 existingImages:', existingImages);
    console.log('🗑️ onRemoveExistingImage 함수:', !!onRemoveExistingImage);
    if (onRemoveExistingImage) {
      onRemoveExistingImage(imageUrl);
    }
  };

  // 총 이미지 개수 계산
  const totalImagesCount = existingImages.length + currentImgLength;

  // 새 이미지 추가 시 총 개수 제한 확인
  const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;

    const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));
    const wouldExceedLimit = totalImagesCount + imageFiles.length > 8;
    if (wouldExceedLimit) {
      const availableSlots = Math.max(0, 8 - totalImagesCount);
      if (availableSlots === 0) {
        alert('이미지는 최대 8개까지 업로드할 수 있습니다.');
        return;
      }
      alert(`이미지는 최대 8개까지 등록할 수 있습니다. ${availableSlots}개만 추가됩니다.`);
    }
    handleChange(e);
  };

  return (
    <div className="flex h-20 items-center gap-2">
      <AttachImagesInput
        onChange={handleNewImageChange}
        imgLength={totalImagesCount} // 전체 개수로 제한 확인
        id={id}
      />
      <div className="scrollbar-hide-x flex w-full gap-1">
        {/* 기존 이미지들 표시 */}
        {isEdit &&
          existingImages.map((imageUrl, index) => (
            <AttachImagesThumbnail
              key={`existing-${imageUrl}`} // URL을 key로 사용 (고유성 보장)
              url={imageUrl}
              handleDelete={() => handleDeleteExistingImage(imageUrl)}
            />
          ))}

        {/* 새로 추가된 이미지들 표시 */}
        {previewImages.map((item, index) => (
          <AttachImagesThumbnail
            key={`new-${index}-${item}`} // 인덱스와 URL 조합으로 고유성 보장
            url={item}
            handleDelete={() => handleDeleteNewImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default AttachImages;
