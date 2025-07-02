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
  setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  setImgLength((prev) => prev - 1);
};

export default deletePreviewImage;
