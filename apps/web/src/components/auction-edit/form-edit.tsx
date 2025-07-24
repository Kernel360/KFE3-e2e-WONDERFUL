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

  // API 응답 구조에 맞게 수정
  const defaultValues = {
    title: auction.title,
    description: auction.description || '',
    category_id: auction.category.id, // category.id로 수정
    start_price: auction.auctionPrice?.startPrice || 0, // auctionPrice.startPrice로 수정
    min_bid_unit: auction.auctionPrice?.minBidUnit || 1000, // auctionPrice.minBidUnit로 수정
    // 시간 차이를 계산해서 숫자로 변환
    end_time: (() => {
      try {
        const endTime = new Date(auction.endTime);
        const now = new Date();
        // 종료시간까지 남은 시간 계산 (시간 단위)
        const hoursRemaining = Math.ceil((endTime.getTime() - now.getTime()) / (1000 * 60 * 60));
        const validHours = Math.max(1, Math.min(99, hoursRemaining)); // 1-99 범위로 제한
        return validHours.toString();
      } catch (error) {
        console.error('⏰ 종료시간 계산 에러:', error);
        return '24'; // 기본값
      }
    })(),
    images:
      auction.auctionImages?.flatMap((image: { id: string; urls: string[] }) => image.urls) || [], // 이미 배열로 가져옴
  };

  // 현재가 정보를 별도로 전달
  const currentPriceInfo = {
    startPrice: auction.auctionPrice?.startPrice || 0,
    currentPrice: auction.auctionPrice?.currentPrice || 0,
    bidCount: auction._count.bids || 0,
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
          defaultValues={defaultValues} // images 포함된 기본값
          isEdit={true}
          existingImages={existingImages} // 기존 이미지 URL 배열(useEditAuction의 상태 전달)
          onRemoveExistingImage={removeExistingImage} // 기존 이미지 삭제 콜백 전달
          currentPriceInfo={currentPriceInfo} // 현재가 정보 전달
        />
      </section>
      <section className="backdrop-blur-xs sticky bottom-0 bg-white/70 px-[15px] pb-9 pt-4">
        <Button size="lg" className="flex w-full">
          {isSubmitting ? '수정 중...' : '수정하기'}
        </Button>
      </section>
    </form>
  );
};

export default FormEdit;
