import { SetStateAction, useCallback } from 'react';

const useOnChagePreview = (
  setImgLength: React.Dispatch<SetStateAction<number>>,
  setPreviewImages: React.Dispatch<SetStateAction<string[]>>,
  setFiles: React.Dispatch<SetStateAction<File[]>>
) => {
  return useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;
      if (!files) return;

      const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));
      if (imageFiles.length === 0) {
        alert('이미지 파일만 등록할 수 있습니다.');
        e.target.value = '';
        return;
      }

      // 현재 파일 개수 확인을 위한 함수
      setFiles((prevFiles) => {
        const combinedFiles = [...prevFiles, ...imageFiles];
        const currentLength = prevFiles.length;

        if (combinedFiles.length > 8) {
          alert('이미지는 최대 8개까지 등록할 수 있습니다.');
          const limitedFiles = combinedFiles.slice(0, 8);
          const actualNewFiles = limitedFiles.slice(currentLength);

          // 새로운 파일들만 프리뷰 생성
          const newUrls = actualNewFiles.map((file) => URL.createObjectURL(file));

          // 별도로 프리뷰와 길이 업데이트
          setPreviewImages((prev) => [...prev, ...newUrls]);
          setImgLength(8);

          return limitedFiles;
        }

        // 정상 케이스
        const newUrls = imageFiles.map((file) => URL.createObjectURL(file));
        setPreviewImages((prev) => [...prev, ...newUrls]);
        setImgLength(currentLength + imageFiles.length);

        return combinedFiles;
      });

      e.target.value = '';
    },
    [setImgLength, setPreviewImages, setFiles]
  );
};

export default useOnChagePreview;
