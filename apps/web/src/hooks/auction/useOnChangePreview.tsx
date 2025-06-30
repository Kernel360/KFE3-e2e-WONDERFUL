import { SetStateAction } from 'react';

const useOnChagePreview =
  (
    setImgLength: React.Dispatch<SetStateAction<number>>,
    setPreviewImages: React.Dispatch<SetStateAction<string[]>>
  ) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;

    const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));
    if (imageFiles.length === 0) {
      alert('이미지 파일만 등록할 수 있습니다.');
      e.target.value = '';
      return;
    }

    //미리보기 이미지 등록
    const newUrls: string[] = imageFiles.map((file) => URL.createObjectURL(file));

    setPreviewImages((prev) => [...prev, ...newUrls]);
    setImgLength((prev) => prev + newUrls.length);

    e.target.value = '';
  };

export default useOnChagePreview;
