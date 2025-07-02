import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createAuctionSchema, CreateAuctionFormData } from '@/lib/schema/auction.schema';
import { FormErrorMessageType } from '@/lib/types/auction';
import { uploadMultipleImages } from '@/lib/supabase/storage';
import { createAuction, updateAuction } from '@/lib/actions/auction.action';

const useCreateAuction = () => {
  const [errors, setErrors] = useState<FormErrorMessageType>({});
  // 에러 메시지 상태를 객체 형태로 보관
  const [files, setFiles] = useState<File[]>([]);
  const [userId, setUserId] = useState('5b7df186-e78f-4ee2-ab53-cef989a9177b');

  const router = useRouter(); // Next.js router 추가

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = e.currentTarget;
      const formData = new FormData(form);
      const newErrors: FormErrorMessageType = {};

      // FormData → rawData 변환
      const rawData = {
        title: String(formData.get('title') ?? ''),
        description: String(formData.get('description') ?? ''),
        category_id: String(formData.get('category_id') ?? ''),
        prices: {
          start_price: Number(formData.get('start_price') ?? 0),
          min_bid_unit: Number(formData.get('min_bid_unit') ?? 0),
        },
        end_time: String(formData.get('end_time') ?? ''),
        images: [''],
      };

      // Zod 유효성 검사
      const result = createAuctionSchema.safeParse(rawData);

      //이미지 등록 여부 확인
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
        // 이미지 에러(newErrors)와 합쳐서 set
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
        // 게시글 먼저 등록 (DB에 글만 생성)
        const auctionId = await createAuction(phasedData, userId);
        if (!auctionId) throw new Error('게시글 등록에 실패했습니다.');

        //스토리지 전송 response = url
        const uploadedUrls = await uploadMultipleImages(files, 'auction-images', auctionId);
        if (!uploadedUrls) throw new Error('이미지 등록에 실패했습니다.');

        // image url만 추출
        const successUrls: string[] = uploadedUrls
          .filter((res) => res.success && res.url)
          .map((res) => res.url!);

        // 이미지 URL DB 업데이트
        await updateAuction(auctionId, { ...phasedData, images: successUrls });

        // 등록 완료 후 상세 페이지로 이동
        router.push(`/auction/${auctionId}`);
      } catch (error) {
        setErrors({ server: '경매 등록 중 오류가 발생했습니다. 다시 시도해주세요.' });
      }
    },
    [files]
  );

  return { errors, handleSubmit, setFiles };
};

export default useCreateAuction;
