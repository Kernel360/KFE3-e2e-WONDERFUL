import { SetStateAction, useCallback, useRef } from 'react';

const useOnChagePreview = (
  setImgLength: React.Dispatch<SetStateAction<number>>,
  setPreviewImages: React.Dispatch<SetStateAction<string[]>>,
  setFiles: React.Dispatch<SetStateAction<File[]>>
) => {
  const alertShownRef = useRef(false);

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

      // 현재 파일 개수를 먼저 확인
      let currentFileCount = 0;
      setFiles((prev) => {
        currentFileCount = prev.length;
        return prev;
      });

      // 조건 확인 후 처리
      const combinedLength = currentFileCount + imageFiles.length;

      if (combinedLength > 8) {
        // alert 중복 방지
        if (!alertShownRef.current) {
          alertShownRef.current = true;
          alert('이미지는 최대 8개까지 등록할 수 있습니다.');
          // 잠시 후 플래그 리셋
          setTimeout(() => {
            alertShownRef.current = false;
          }, 1000);
        }

        // 8개까지만 허용
        const availableSlots = 8 - currentFileCount;
        const filesToAdd = imageFiles.slice(0, availableSlots);

        if (filesToAdd.length > 0) {
          const newUrls = filesToAdd.map((file) => URL.createObjectURL(file));

          setFiles((prev) => [...prev, ...filesToAdd]);
          setPreviewImages((prev) => [...prev, ...newUrls]);
          setImgLength(8);
        }
      } else {
        // 정상 처리
        const newUrls = imageFiles.map((file) => URL.createObjectURL(file));

        setFiles((prev) => [...prev, ...imageFiles]);
        setPreviewImages((prev) => [...prev, ...newUrls]);
        setImgLength(combinedLength);
      }

      e.target.value = '';
    },
    [setImgLength, setPreviewImages, setFiles]
  );
};

export default useOnChagePreview;
