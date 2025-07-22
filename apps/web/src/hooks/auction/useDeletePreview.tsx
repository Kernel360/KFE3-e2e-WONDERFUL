interface DeletePreviewImageParams {
  setImgLength: React.Dispatch<React.SetStateAction<number>>;
  setPreviewImages: React.Dispatch<React.SetStateAction<string[]>>;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  index: number;
  onFilesChange?: (files: File[]) => void; // ref 동기화 콜백
}

const deletePreviewImage = ({
  setImgLength,
  setPreviewImages,
  setFiles,
  index,
  onFilesChange,
}: DeletePreviewImageParams) => {
  // 이미지 URL 해제
  setPreviewImages((prevImages) => {
    const imageToDelete = prevImages[index];
    if (imageToDelete) {
      URL.revokeObjectURL(imageToDelete);
    }
    const newImages = prevImages.filter((_, i) => i !== index);
    return newImages;
  });

  // 파일 삭제
  setFiles((prevFiles) => {
    const newFiles = prevFiles.filter((_, i) => i !== index);

    // ref 동기화
    if (onFilesChange) {
      onFilesChange(newFiles);
    }

    return newFiles;
  });

  // 이미지 길이 업데이트
  setImgLength((prev) => Math.max(0, prev - 1));
};

export default deletePreviewImage;
