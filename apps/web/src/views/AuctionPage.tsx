'use client';

import React, { useEffect } from 'react';

import { MessageSquareMore } from 'lucide-react';

import BidForm from '@/components/auction-detail/bid-form';
import BidTable from '@/components/auction-detail/bid-table';
import ItemImages from '@/components/auction-detail/item-images';
import ItemInformation from '@/components/auction-detail/item-information';
import { ProfileCard } from '@/components/common/profile';
import { TabBasic } from '@/components/common/tab';
import { Button } from '@/components/ui/button';

import { useAuctionDetail } from '@/hooks/queries/auction/useAuctions';

import { ItemInfo } from '@/lib/types/auction';

interface AuctionTabItem {
  key: string;
  label: string;
  content: React.ReactNode;
}

interface AuctionPageProps {
  auctionId: string;
}

const AuctionPage = ({ auctionId }: AuctionPageProps) => {
  // 현재 로그인한 유저의 ID를 가져오는 로직 필요 (useAuthStore)
  const userId = undefined;

  const {
    data: auctionDetailData,
    isLoading,
    error,
    refetch,
  } = useAuctionDetail(auctionId, userId);

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

  // 탭 아이템 구성
  const tabItems: AuctionTabItem[] = [
    {
      key: 'description',
      label: '상세 설명',
      content: (
        <div className="whitespace-pre-wrap p-4">
          {auction.description || '상세 설명이 없습니다.'}
        </div>
      ),
    },
    {
      key: 'table',
      label: '입찰 현황',
      // content: <BidTable auctionId={auctionId} />,
      content: <BidTable />,
    },
  ];
  // 처리된 이미지 배열 가져오기
  const images = processImages();

  return (
    <main className="w-full">
      <section className="flex flex-col items-center gap-1 px-0">
        <ItemImages urls={images} />
        <ProfileCard
          nickname="user1234"
          profileImg="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80"
        >
          <Button variant="outline">
            <MessageSquareMore />
            채팅하기
          </Button>
        </ProfileCard>
        <ItemInformation item={item} />
        <TabBasic tabs={tabItems} />
      </section>
      <footer className="sticky bottom-0 z-50 w-full bg-white">
        <BidForm currentPrice={item.currentPrice} endTime={auction.endTime} />
      </footer>
    </main>
  );
};

export default AuctionPage;
