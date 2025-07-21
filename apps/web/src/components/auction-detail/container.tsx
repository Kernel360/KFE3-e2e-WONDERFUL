'use client';
/**
 * Todo
 * 1. Item 데이터 변환 : 내려줘야하는 컴포넌트 별 prop 기준으로 다시 재작성.
 * 2. error 케이스별 컴포넌트로 error 상황 처리하기 (재사용성))
 * 3. suspense 컴포넌트 따로 만들어서 lazy.loading 처리
 * 4. 현재 로그인한 유저의 ID를 가져오는 로직 필요 (useAuthStore)
 * 5. ItemImages prioty 처리
 */

import { useEffect, useRef } from 'react';

import { useParams } from 'next/navigation';

import { MessageSquareMore } from 'lucide-react';

import {
  BidForm,
  BidTable,
  ItemDescription,
  ItemImages,
  ItemSummary,
} from '@/components/auction-detail';
import { ProfileCard } from '@/components/common';
import { Button } from '@/components/ui/button';

import { useAuctionDetail } from '@/hooks/queries/auction';
import { useBidsByAuction } from '@/hooks/queries/bids';

import { cn } from '@/lib/cn';
import { ItemInfo } from '@/lib/types/auction';
import { BidType } from '@/lib/types/bid';

const AuctionDetailContainer = () => {
  const bidTableRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const { id } = params;

  const {
    data: auctionDetailData,
    isLoading,
    error,
    refetch: refetchAuction,
  } = useAuctionDetail(id as string);

  useEffect(() => {
    refetchAuction();
  }, [refetchAuction]);

  // 초기 입찰 데이터 로드 추가
  const { data: initialBidsData } = useBidsByAuction(id as string, 10);

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
          onClick={() => refetchAuction()}
          className="bg-primary-500 hover:bg-primary-600 rounded-lg px-4 py-2 text-white transition-colors"
        >
          다시 시도
        </button>
      </div>
    );
  }

  const auction = auctionDetailData.data;
  const seller = auction.seller; // 판매자 정보

  // 초기 입찰 데이터 준비
  const initialBids = (initialBidsData?.data as BidType[]) || [];

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

  const sectionStyle = '[&_section]:w-full [&_section]:px-4 [&_section]:bg-white';

  return (
    <>
      <article className={cn(`flex flex-col items-center break-keep bg-neutral-100`, sectionStyle)}>
        <ItemImages urls={images} />
        <ProfileCard
          nickname={seller.nickname}
          profileImg={seller.profileImg ? seller.profileImg : '/avatar-female.svg'}
        >
          <Button variant="outline">
            <MessageSquareMore />
            채팅하기
          </Button>
        </ProfileCard>
        <ItemSummary item={item} id={id as string} />
        <ItemDescription item={item} />
        <section ref={bidTableRef} className="space-y-2 pb-10 pt-6">
          <h3 className="mb-2.5 text-base font-bold">입찰 현황</h3>
          <BidTable auctionId={auction.id} initialBids={initialBids} />
        </section>
      </article>
      <aside className="sticky bottom-0 z-50 w-full">
        <BidForm
          auctionId={auction.id}
          currentPrice={item.currentPrice}
          endTime={item.endTime}
          bidTableRef={bidTableRef}
          isExpired={false}
        />
      </aside>
    </>
  );
};

export default AuctionDetailContainer;
