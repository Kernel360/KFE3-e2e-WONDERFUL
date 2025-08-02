'use client';

import { useEffect, useRef } from 'react';

import { useParams } from 'next/navigation';

import {
  BidForm,
  BidTable,
  ButtonChat,
  ItemDescription,
  ItemImages,
  ItemSummary,
  Skeleton,
} from '@/components/auction-detail/index';

import { useAuctionDetail } from '@/hooks/queries/auction';
import { useCurrentUser } from '@/hooks/queries/auth';
import { useBidsByAuction } from '@/hooks/queries/bids';

import { cn } from '@/lib/cn';
import { ItemInfo } from '@/lib/types/auction';
import { useToastStore } from '@/lib/zustand/store';

import { BidType } from '@/types/bid';

import { ProfileCard } from '../common';

const AuctionDetailContainer = () => {
  const bidTableRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const { id } = params;

  const { data: currentUser } = useCurrentUser();
  const { showToast } = useToastStore();

  const {
    data: auctionDetailData,
    isLoading,
    error,
    refetch: refetchAuction,
  } = useAuctionDetail(id as string);

  const { data: initialBidsData } = useBidsByAuction(id as string, 10);

  useEffect(() => {
    if (error || !auctionDetailData?.data) {
      showToast({
        status: 'error',
        title: '경매 불러오기 실패',
        subtext: '경매 정보를 불러오는 데 실패했습니다. 잠시 후 다시 시도 해주세요.',
        autoClose: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  if (isLoading) {
    return <Skeleton />;
  }

  const auction = auctionDetailData.data;
  const { location } = auction;

  const initialBids = (initialBidsData?.data as BidType[]) || [];

  const processImages = (): string[] => {
    if (!auction?.auctionImages?.length) return ['/no-image.png'];
    const allUrls = auction.auctionImages.flatMap((image) => image.urls || []);
    return allUrls.length > 0 ? allUrls : ['/no-image.png'];
  };

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

  const { seller } = auction;
  const chatRoomSellerProps = {
    id: seller.id,
    nickname: seller.nickname,
  };

  const images = processImages();

  const sectionStyle = '[&_section]:w-full [&_section]:px-4 [&_section]:bg-white';

  return (
    <>
      <article className={cn(`flex flex-col items-center break-keep bg-neutral-100`, sectionStyle)}>
        <ItemImages urls={images} />
        <ProfileCard
          nickname={seller.nickname}
          profileImg={seller.profileImg ? seller.profileImg : '/avatar-female.svg'}
          location={location?.locationName}
        >
          {currentUser?.id !== seller.id && (
            <ButtonChat auctionId={auction.id} seller={chatRoomSellerProps} />
          )}
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
          minBidUnit={item.minBidUnit}
          currentPrice={item.currentPrice}
          endTime={item.endTime}
          bidTableRef={bidTableRef}
          isExpired={false}
          seller={chatRoomSellerProps}
          currentUserId={currentUser?.id}
        />
      </aside>
    </>
  );
};

export default AuctionDetailContainer;
