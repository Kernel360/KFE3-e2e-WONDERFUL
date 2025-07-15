'use client';
/**
 * Todo
 * 1. 전역상태 관리
 *    -> 현재 최고 입찰가 = bid-form의 최소 입찰 금액
 *    -> Item 데이터 변환 : 내려줘야하는 컴포넌트 별 prop 기준으로 다시 재작성.
 *    -> store로 처리할 수 있는 부분은 prop은 최소화로 쓰기
 * 2. error 처리는 useEffect 안에서 처리! -> 재로딩 컴포넌트 따로 만들어서 호출하기
 * 3. suspense 컴포넌트 따로 만들어서 lazy.loading 처리
 * 4. 현재 로그인한 유저의 ID를 가져오는 로직 필요 (useAuthStore)
 */

import { useEffect } from 'react';

import { useParams } from 'next/navigation';

import { MessageSquareMore } from 'lucide-react';

import { BidForm, ItemImages, ItemInformation } from '@/components/auction-detail';
import { ProfileCard } from '@/components/common';
import { Button } from '@/components/ui/button';

import { useAuctionDetail } from '@/hooks/queries/auction/useAuctions';

import { ItemInfo } from '@/lib/types/auction';

const AuctionDetailContainer = () => {
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
    description: auction.description || '',

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
        <ItemInformation item={item} id={id as string} />
      </section>
      <section className="sticky bottom-0 z-50 w-full bg-white">
        <BidForm currentPrice={item.currentPrice} endTime={auction.endTime} />
      </section>
    </>
  );
};

export default AuctionDetailContainer;
