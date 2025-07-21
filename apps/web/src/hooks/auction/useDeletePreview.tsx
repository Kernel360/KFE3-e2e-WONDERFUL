import { SetStateAction } from 'react';

interface DeletePreviewImageProps {
  setImgLength: React.Dispatch<SetStateAction<number>>;
  setPreviewImages: React.Dispatch<SetStateAction<string[]>>;
  setFiles: React.Dispatch<SetStateAction<File[]>>;
  index: number;
}

const deletePreviewImage = ({
  setImgLength,
  setPreviewImages,
  setFiles,
  index,
}: DeletePreviewImageProps) => {
  // 프리뷰 이미지에서 해당 인덱스 제거
  setPreviewImages((prev) => prev.filter((_, i) => i !== index));

  // 파일 배열에서도 해당 인덱스 제거
  setFiles((prev) => prev.filter((_, i) => i !== index));

  // 이미지 개수 감소
  setImgLength((prev) => prev - 1);
};

export default deletePreviewImage;
