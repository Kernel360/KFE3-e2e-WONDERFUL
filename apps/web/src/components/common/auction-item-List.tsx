'use client';

import AuctionItemCard from '@/components/common/auction-item-card';

import { useAuctions } from '@/hooks/queries/auction/useAuctions';

import { SortOption } from '@/lib/types/auction-prisma';

import { AuctionItemProps } from '@/types/auction';
import { useEffect } from 'react';

interface AuctionItemListProps {
  selectedCategoryId?: string;
  sortOption?: SortOption;
  selectedLocationId?: string | null;
  includeCompleted?: boolean; // 종료된 경매 포함 여부
}

const AuctionItemList = ({
  selectedCategoryId = '',
  sortOption = 'latest',
  selectedLocationId,
  includeCompleted = false, // 기본값은 종료된 경매 미포함
}: AuctionItemListProps) => {
  // useAuctions 훅을 사용하여 경매 목록 조회 (카테고리 ID로 필터링)
  const {
    data: auctionsData,
    isLoading,
    error,
    refetch,
  } = useAuctions(
    selectedLocationId || undefined,
    selectedCategoryId || undefined,
    sortOption,
    includeCompleted
  );

  useEffect(() => {
    if (refetch) refetch();
  }, []);

  // 데이터를 AuctionItemCard에서 사용할 수 있는 형태로 변환
  const convertToAuctionItemProps = (auction: any): AuctionItemProps => {
    // 현재 시간과 경매 종료 시간 비교
    const now = new Date();
    const endTime = new Date(auction.endTime);

    // 실제 경매 상태 결정 로직
    const isAuctionActive = auction.status === 'ACTIVE' && now < endTime;
    const auctionStatus = isAuctionActive ? '경매중' : '경매종료';

    return {
      id: auction.id,
      title: auction.title,
      status: auctionStatus,
      originalPrice: auction.auctionPrice?.startPrice || 0,
      currentPrice: auction.auctionPrice?.currentPrice || 0,
      deadline: auction.endTime || new Date().toISOString(),
      thumbnailUrl: auction.thumbnailUrl || '',
    };
  };

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-lg text-neutral-600">경매 목록을 불러오는 중...</div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <div className="text-danger-600 text-lg">경매 목록을 불러오는 중 오류가 발생했습니다.</div>
        <button
          onClick={() => refetch()}
          className="bg-primary-500 hover:bg-primary-600 rounded-lg px-4 py-2 text-white transition-colors"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {auctionsData?.data && auctionsData.data.length > 0 ? (
        auctionsData.data.map((auction) => {
          const auctionItemProps = convertToAuctionItemProps(auction);
          return <AuctionItemCard key={auction.id} {...auctionItemProps} />;
        })
      ) : (
        // 데이터 없음 상태
        <div className="flex flex-col items-center justify-center py-16">
          <div className="mb-2 text-neutral-400">
            <svg className="h-16 w-16" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="mb-1 text-lg font-medium text-neutral-900">경매가 없습니다</h3>
          <p className="text-neutral-600">현재 진행 중인 경매가 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default AuctionItemList;
