import { SetStateAction, useCallback, useRef } from 'react';

const MAX_IMAGE_COUNT = 8;

const useOnChangePreview = (
  setImgLength: React.Dispatch<SetStateAction<number>>,
  setPreviewImages: React.Dispatch<SetStateAction<string[]>>,
  setFiles: React.Dispatch<SetStateAction<File[]>>
) => {
  const alertShownRef = useRef(false);
  const currentFilesRef = useRef<File[]>([]);

  // ref와 상태를 동기화하는 함수
  const syncCurrentFiles = useCallback((files: File[]) => {
    currentFilesRef.current = files;
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;
      if (!files) return;

      const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));

      if (imageFiles.length === 0) {
        alert('이미지 파일만 등록할 수 있습니다.');
        e.target.value = '';
        return;
      }

      // 현재 파일 개수 계산
      const currentFileCount = currentFilesRef.current.length;
      const combinedLength = currentFileCount + imageFiles.length;

      if (combinedLength > MAX_IMAGE_COUNT) {
        // alert 중복 방지
        if (!alertShownRef.current) {
          alertShownRef.current = true;
          alert(`이미지는 최대 ${MAX_IMAGE_COUNT}개까지 등록할 수 있습니다.`);
          setTimeout(() => {
            alertShownRef.current = false;
          }, 1000);
        }

        // 추가 가능한 슬롯만큼만 허용
        const availableSlots = MAX_IMAGE_COUNT - currentFileCount;
        const filesToAdd = imageFiles.slice(0, availableSlots);

        if (filesToAdd.length === 0) {
          e.target.value = '';
          return;
        }

        // 새로운 파일 배열 생성
        const newFiles = [...currentFilesRef.current, ...filesToAdd];
        const newUrls = filesToAdd.map((file) => URL.createObjectURL(file));

        // ref 업데이트
        currentFilesRef.current = newFiles;

        // 상태 업데이트
        setFiles(newFiles);
        setPreviewImages((prevImages) => [...prevImages, ...newUrls]);
        setImgLength(newFiles.length); // 실제 파일 개수로 설정
      } else {
        // 새로운 파일 배열 생성
        const newFiles = [...currentFilesRef.current, ...imageFiles];
        const newUrls = imageFiles.map((file) => URL.createObjectURL(file));

        // ref 업데이트
        currentFilesRef.current = newFiles;

        // 상태 업데이트
        setFiles(newFiles);
        setPreviewImages((prevImages) => [...prevImages, ...newUrls]);
        setImgLength(newFiles.length); // 실제 파일 개수로 설정
      }

      e.target.value = '';
    },
    [setImgLength, setPreviewImages, setFiles]
  );

  return { handleChange, syncCurrentFiles };
};

export default useOnChangePreview;
