import { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import { addAuctionImages, createAuction, updateThumbnailOnly } from '@/lib/actions/auction';
import { CreateAuctionFormData, createAuctionSchema } from '@/lib/schema/auction.schema';
import { createClient } from '@/lib/supabase/client';
import { uploadMultipleImages } from '@/lib/supabase/storage';
import { FormErrorMessageType } from '@/lib/types/auction';

const useCreateAuction = () => {
  const [errors, setErrors] = useState<FormErrorMessageType>({});
  // 에러 메시지 상태를 객체 형태로 보관
  const [files, setFiles] = useState<File[]>([]);
  const [isPending, setIsPending] = useState(false);

  const router = useRouter(); // Next.js router 추가
  const queryClient = useQueryClient();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isPending) return; // 이미 진행 중이면 리턴

      setIsPending(true);

      try {
        const form = e.currentTarget;
        const formData = new FormData(form);
        const newErrors: FormErrorMessageType = {};

        //로그인된 사용자 ID 가져오기
        const supabase = createClient();
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          setErrors({ server: '로그인이 필요합니다. 다시 로그인해주세요.' });
          return; // 이제 finally에서 setIsPending(false) 실행됨
        }

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
          is_instant_buy_enabled: formData.get('is_instant_buy_enabled') === 'true',
          is_extended_auction: formData.get('is_extended_auction') === 'true',
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
          return; // 이제 finally에서 setIsPending(false) 실행됨
        }

        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return; // 이제 finally에서 setIsPending(false) 실행됨
        }

        setErrors({});

        const startPrice = rawData.prices.start_price;

        const phasedData: CreateAuctionFormData = {
          ...result.data,
          is_instant_buy_enabled: rawData.is_instant_buy_enabled,
          is_extended_auction: rawData.is_extended_auction,
          prices: {
            ...result.data.prices,
            instant_price: rawData.is_instant_buy_enabled
              ? Math.floor(startPrice * 1.2)
              : undefined,
          },
        };

        // try 블록 제거 (이미 위에서 시작)
        // 1. 먼저 경매 등록 (auctionId 받기)
        const phasedDataWithoutImages = {
          ...phasedData,
          images: [], // 빈 배열로 일단 등록
        };

        const auctionId = await createAuction(phasedDataWithoutImages, user.id);
        if (!auctionId) throw new Error('게시글 등록에 실패했습니다.');

        // 2. 이미지 업로드 (auctionId를 폴더명으로 사용)
        const uploadedUrls = await uploadMultipleImages(files, 'auction-images', auctionId);
        if (!uploadedUrls) throw new Error('이미지 등록에 실패했습니다.');

        // image url만 추출
        const successUrls: string[] = uploadedUrls
          .filter((res) => res.success && res.url)
          .map((res) => res.url!);

        // 3. 이미지 URL로 auction_images 테이블 업데이트
        if (successUrls.length > 0) {
          // auction_images 테이블에 직접 삽입
          await addAuctionImages(auctionId, successUrls);

          // 썸네일 업데이트
          await updateThumbnailOnly(successUrls[0] || '', auctionId);
        }

        // ✅ 4. 쿼리 캐시 무효화 (페이지 이동 전에 실행)
        console.log('🔄 쿼리 캐시 무효화 시작...');

        // 경매 목록 관련 쿼리만 무효화 (상세 쿼리 제외)
        await queryClient.invalidateQueries({
          queryKey: ['auctions', 'list'],
        });

        // 경매 목록만 리패치 (상세 쿼리 제외)
        await queryClient.refetchQueries({
          queryKey: ['auctions', 'list'],
        });
        console.log('✅ 쿼리 캐시 무효화 완료');

        // 5. 페이지 이동
        router.push(`/auction/${auctionId}`);
      } catch (error) {
        // catch 블록 추가
        console.error('❌ 경매 등록 에러:', error); // 콘솔 로그 추가
        setErrors({ server: '경매 등록 중 오류가 발생했습니다. 다시 시도해주세요.' });
      } finally {
        // finally 블록 추가
        setIsPending(false); // 모든 경우에 pending 상태 해제
      }
    },
    [files, router, isPending]
  );

  return { errors, handleSubmit, setFiles, isPending };
};

export default useCreateAuction;
