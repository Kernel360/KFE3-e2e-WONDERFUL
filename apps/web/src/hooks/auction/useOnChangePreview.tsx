import { SetStateAction } from 'react';

const useOnChagePreview =
  (
    setImgLength: React.Dispatch<SetStateAction<number>>,
    setPreviewImages: React.Dispatch<SetStateAction<string[]>>,
    setFiles: React.Dispatch<SetStateAction<File[]>>
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

    // 현재 파일들과 새로 선택된 파일들을 합쳐서 8개 제한 적용
    setFiles((prev) => {
      const combinedFiles = [...prev, ...imageFiles];

      if (combinedFiles.length > 8) {
        alert('이미지는 최대 8개까지 등록할 수 있습니다.');
        // 8개까지만 잘라서 반환
        const limitedFiles = combinedFiles.slice(0, 8);

        // 프리뷰도 동일하게 8개로 제한
        const newUrls = limitedFiles.slice(prev.length).map((file) => URL.createObjectURL(file));
        setPreviewImages((prevImages) => [...prevImages, ...newUrls]);
        setImgLength(8);

        return limitedFiles;
      }

      // 8개 이하인 경우 정상 처리
      const newUrls = imageFiles.map((file) => URL.createObjectURL(file));
      setPreviewImages((prevImages) => [...prevImages, ...newUrls]);
      setImgLength(prev.length + imageFiles.length);

      return combinedFiles;
    });

    e.target.value = '';
  };

export default useOnChagePreview;
