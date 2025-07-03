import { useCallback, useState } from 'react';
import { FormErrorMessageType } from '@/types/auction';
import { useRouter } from 'next/navigation';
import { CreateAuctionFormData, createAuctionSchema } from '@/lib/schema/auction.schema';
import { updateAuction } from '@/lib/actions/auction.action';
import { deleteFolder, uploadMultipleImages } from '@/lib/supabase/storage';

const useEditAuction = (itemId: string) => {
  const [errors, setErrors] = useState<FormErrorMessageType>({});
  const [files, setFiles] = useState<File[]>([]);

  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = e.currentTarget;
      const formData = new FormData(form);
      const newErrors: FormErrorMessageType = {};

      const rawData = {
        title: String(formData.get('title') ?? ''),
        description: String(formData.get('description') ?? ''),
        category_id: String(formData.get('category_id') ?? ''),
        prices: {
          start_price: Number(formData.get('start_price') ?? 0),
          min_bid_unit: Number(formData.get('min_bid_unit') ?? 0),
        },
        end_time: String(formData.get('end_time') ?? ''),
        images: [],
      };

      const result = createAuctionSchema.safeParse(rawData);

      if (files.length <= 0) {
        newErrors.images = '이미지를 꼭 한 장 이상 등록해주세요.';
      }

      if (!result.success) {
        console.log('유효성 검사 실패');
        const zodErrors: FormErrorMessageType = {};
        for (const issue of result.error.errors) {
          const path = issue.path.join('.');
          zodErrors[path] = issue.message;
        }
        setErrors({ ...newErrors, ...zodErrors });
        return;
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setErrors({});

      const phasedData: CreateAuctionFormData = {
        ...result.data,
      };

      try {
        const auctionId = await updateAuction(phasedData, itemId);
        if (!auctionId) throw new Error('게시글 수정에 실패했습니다.');

        const deleteImages = await deleteFolder('auction-images', auctionId);
        if (!deleteImages) throw new Error('이미지 초기화에 실패했습니다.');

        const uploadedUrls = await uploadMultipleImages(files, 'auction-images', auctionId);
        if (!uploadedUrls) throw new Error('이미지 등록에 실패했습니다.');

        const successUrls: string[] = uploadedUrls
          .filter((res) => res.success && res.url)
          .map((res) => res.url!);

        await updateAuction({ ...phasedData, images: successUrls }, auctionId);

        router.push(`/auction/${auctionId}`);
      } catch (error) {
        setErrors({ server: '경매 등록 중 오류가 발생했습니다. 다시 시도해주세요.' });
        console.log(error);
      }
    },
    [files]
  );

  return { errors, handleSubmit, setFiles };
};

export default useEditAuction;
