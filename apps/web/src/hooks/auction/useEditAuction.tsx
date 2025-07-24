import { useCallback, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import { updateAuction } from '@/lib/actions/auction';
import { createAuctionSchema } from '@/lib/schema/auction.schema';
import { uploadMultipleImages } from '@/lib/supabase/storage';

import { FormErrorMessageType } from '@/types/auction';

const useEditAuction = (itemId: string) => {
  const [errors, setErrors] = useState<FormErrorMessageType>({});
  const [files, setFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const isInitializedRef = useRef(false);
  const queryClient = useQueryClient();

  const initializeImages = useCallback((originalImages: string[]) => {
    if (!isInitializedRef.current && originalImages.length > 0) {
      setExistingImages(originalImages);
      isInitializedRef.current = true;
    }
  }, []);

  const removeExistingImage = useCallback((imageUrl: string) => {
    setExistingImages((prev) => prev.filter((url) => url !== imageUrl));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isSubmitting) return;
      setIsSubmitting(true);

      try {
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
        const totalImageCount = existingImages.length + files.length;

        if (totalImageCount === 0) {
          newErrors.images = '이미지를 꼭 한 장 이상 등록해주세요.';
        }

        if (!result.success) {
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

        let finalImages: string[] = [...existingImages];

        // 새 파일 업로드
        if (files.length > 0) {
          const uploadedUrls = await uploadMultipleImages(files, 'auction-images', itemId);
          if (!uploadedUrls) throw new Error('새 이미지 등록에 실패했습니다.');

          const newImageUrls = uploadedUrls
            .filter((res) => res.success && res.url)
            .map((res) => res.url!);

          finalImages = [...finalImages, ...newImageUrls];
        }

        console.log('🔄 서버액션 호출 시작...');
        // 서버 액션 호출
        await updateAuction({ ...result.data, images: finalImages }, itemId);
        console.log('✅ 서버액션 완료');

        await queryClient.invalidateQueries({
          queryKey: ['auctions', 'detail', itemId],
        });

        await queryClient.fetchQuery({
          queryKey: ['auctions', 'detail', itemId],
        });
        console.log('✅ 최신 데이터 fetch 완료');

        console.log('✅ 모든 처리 완료, 페이지 이동...');
        router.push(`/auction/${itemId}`);
      } catch (error) {
        setErrors({ server: '경매 수정 중 오류가 발생했습니다. 다시 시도해주세요.' });
        console.error('❌ 수정 에러:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [files, existingImages, itemId, router, queryClient, isSubmitting]
  );

  return {
    errors,
    handleSubmit,
    setFiles,
    existingImages,
    removeExistingImage,
    initializeImages,
    isSubmitting,
  };
};

export default useEditAuction;
