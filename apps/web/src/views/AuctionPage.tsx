'use client';

import { useEffect } from 'react';

import { useParams } from 'next/navigation';

import { MessageSquareMore } from 'lucide-react';

import { BidForm, BidTable, ItemImages, ItemInformation } from '@/components/auction-detail';
import { ProfileCard } from '@/components/common/profile';
import { Button } from '@/components/ui/button';

import { useAuctionDetail } from '@/hooks/queries/auction/useAuctions';

import { ItemInfo } from '@/lib/types/auction';

const AuctionPage = () => {
  // Todo: 현재 로그인한 유저의 ID를 가져오는 로직 필요 (useAuthStore)
  const userId = undefined;

  const params = useParams();
  const { id } = params;

  const {
    data: auctionDetailData,
    isLoading,
    error,
    refetch,
  } = useAuctionDetail(id as string, userId);

  useEffect(() => {
    refetch();
  }, [refetch]);

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-neutral-600">경매 정보를 불러오는 중...</div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error || !auctionDetailData?.data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <div className="text-danger-600 text-lg">경매 정보를 불러오는 중 오류가 발생했습니다.</div>
        <button
          onClick={() => refetch()}
          className="bg-primary-500 hover:bg-primary-600 rounded-lg px-4 py-2 text-white transition-colors"
        >
          다시 시도
        </button>
      </div>
    );
  }

  const auction = auctionDetailData.data;

  // 이미지 배열 처리 함수
  const processImages = (): string[] => {
    if (!auction?.auctionImages?.length) return ['/no-image.png'];
    // 모든 레코드의 urls를 하나의 배열로 합치기
    const allUrls = auction.auctionImages.flatMap((image) => image.urls || []);
    return allUrls.length > 0 ? allUrls : ['/no-image.png'];
  };

  // Item 데이터 변환
  const item: ItemInfo = {
    title: auction.title,
    status: auction.status,
    endTime: auction.endTime.toString(),
    // 추가 필요한 필드들
    startPrice: auction.auctionPrice?.startPrice || 0,
    currentPrice: auction.auctionPrice?.currentPrice || 0,
    instantPrice: auction.auctionPrice?.instantPrice,
    minBidUnit: auction.auctionPrice?.minBidUnit || 1000,
    isInstantBuyEnabled: auction.auctionPrice?.isInstantBuyEnabled || false,
    bidCount: auction._count.bids,
    favoriteCount: auction._count.favoriteItems,
    isFavorite: auctionDetailData.userFavorite.isFavorite,
    category: auction.category.name,
  };

  // 처리된 이미지 배열 가져오기
  const images = processImages();

  return (
    <>
      <section className="flex flex-col items-center gap-1 px-0">
        <ItemImages urls={images} />
        <ProfileCard
          nickname="user1234"
          profileImg="https://autkdwezfwdduoqiadsc.supabase.co/storage/v1/object/public/auction-images/0bf0d884-38e1-4cf9-8663-5f65d0685233/1751631153830_jfii5z.jpeg"
        >
          <Button variant="outline">
            <MessageSquareMore />
            채팅하기
          </Button>
        </ProfileCard>
        <ItemInformation item={item} />
        <div className="my-6 w-full space-y-6 px-4">
          <div className="">{auction.description}</div>
          <div className="bg-primary-50/80 rounded-sm px-2 py-1">
            <BidTable itemId={id as string} />
          </div>
        </div>
      </section>
      <footer className="sticky bottom-0 z-50 w-full bg-white">
        <BidForm currentPrice={item.currentPrice} endTime={auction.endTime} />
      </footer>
    </>
  );
};

export default AuctionPage;
