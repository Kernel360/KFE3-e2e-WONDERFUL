'use client';

import CreateAuctionForm from '@/components/auction-create/form-create';
import { Button } from '@/components/ui';

import useEditAuction from '@/hooks/auction/useEditAuction';
import { useAuctionDetail } from '@/hooks/queries/auction';

interface FormEditProps {
  itemId: string;
}

const FormEdit = ({ itemId }: FormEditProps) => {
  const { data: auctionData, isLoading, error } = useAuctionDetail(itemId);
  const {
    handleSubmit,
    errors,
    setFiles,
    existingImages,
    removeExistingImage,
    initializeImages,
    isSubmitting,
  } = useEditAuction(itemId);

  // 로딩 중일 때의 처리
  if (isLoading) return <div>로딩 중...</div>;

  // 에러가 발생했을 때의 처리
  if (error || !auctionData?.data) return <div>에러 발생</div>;

  // 이제 안전하게 데이터 접근
  const auction = auctionData.data;

  // 입찰 여부 확인
  const hasBids =
    (auction.auctionPrice?.currentPrice || 0) > (auction.auctionPrice?.startPrice || 0);
  const isEditable = !hasBids; // 입찰이 없어야 수정 가능

  console.log('📊 수정 가능 여부:', {
    startPrice: auction.auctionPrice?.startPrice,
    currentPrice: auction.auctionPrice?.currentPrice,
    bidCount: auction._count.bids,
    hasBids,
    isEditable,
  });

  // API 응답 구조에 맞게 수정
  const defaultValues = {
    title: auction.title,
    description: auction.description || '',
    category_id: auction.category.id,
    // 입찰이 있으면 현재가, 없으면 시작가 표시
    start_price: hasBids
      ? auction.auctionPrice?.currentPrice || 0 // 입찰 있음: 현재가 표시
      : auction.auctionPrice?.startPrice || 0, // 입찰 없음: 시작가 표시
    min_bid_unit: auction.auctionPrice?.minBidUnit || 1000,
    // 시간 차이를 계산해서 숫자로 변환
    end_time: (() => {
      try {
        const endTime = new Date(auction.endTime);
        const now = new Date();
        const hoursRemaining = Math.ceil((endTime.getTime() - now.getTime()) / (1000 * 60 * 60));
        const validHours = Math.max(1, Math.min(99, hoursRemaining));
        return validHours.toString();
      } catch (error) {
        console.error('⏰ 종료시간 계산 에러:', error);
        return ''; // 기본값
      }
    })(),
    images:
      auction.auctionImages?.flatMap((image: { id: string; urls: string[] }) => image.urls) || [],
  };

  // 현재가 정보를 별도로 전달 (입찰 상태 포함)
  const currentPriceInfo = {
    startPrice: auction.auctionPrice?.startPrice || 0,
    currentPrice: auction.auctionPrice?.currentPrice || 0,
    bidCount: auction._count.bids || 0,
    hasBids, // 입찰 여부
    isEditable, // 수정 가능 여부
  };

  // 초기화 호출
  const originalImages =
    auction.auctionImages?.flatMap((image: { id: string; urls: string[] }) => image.urls) || [];
  initializeImages(originalImages);

  return (
    <form onSubmit={handleSubmit} className="relative mt-2.5">
      <section className="px-[15px]">
        <CreateAuctionForm
          errors={errors}
          setFiles={setFiles}
          defaultValues={defaultValues}
          isEdit={true}
          existingImages={existingImages}
          onRemoveExistingImage={removeExistingImage}
          currentPriceInfo={currentPriceInfo} // 입찰 상태 정보 포함
        />
      </section>
      <section className="backdrop-blur-xs sticky bottom-0 bg-white/70 px-[15px] pb-9 pt-4">
        <Button size="lg" className="flex w-full" disabled={isSubmitting} type="submit">
          {isSubmitting ? '수정 중...' : '수정하기'}
        </Button>
      </section>
    </form>
  );
};

export default FormEdit;
