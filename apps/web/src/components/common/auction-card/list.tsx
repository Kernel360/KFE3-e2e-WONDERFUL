'use client';

import { useMemo } from 'react';

import { AuctionCard } from '@/components/common';

import { useAuctions } from '@/hooks/queries/auction';

import { AuctionListItem, SortOption } from '@/lib/types/auction-prisma';
import { useFilterStore, useLocationStore } from '@/lib/zustand/store';

import { AuctionItemProps } from '@/types/auction';
import { AuctionStatus } from '@/types/filter';

interface AuctionItemListProps {
  sortOption?: SortOption;
  includeCompleted?: boolean; // 종료된 경매 포함 여부
  selectedStatuses?: AuctionStatus[];
}

const AuctionItemList = ({
  sortOption = 'latest',
  includeCompleted = false, // 기본값은 종료된 경매 미포함
  selectedStatuses,
}: AuctionItemListProps) => {
  const selectedCategoryId = useFilterStore((state) => state.selectedItems.category);

  // 정렬은 Zustand 전역 상태로 관리 (헤더와 공유)
  const selectedLocationName = useLocationStore((state) => state.selectedLocation.locationName);
  includeCompleted = true;

  // useAuctions 훅을 사용하여 경매 목록 조회 (카테고리 ID로 필터링)
  const {
    data: auctionsData,
    isLoading,
    error,
    refetch,
  } = useAuctions(
    selectedLocationName && selectedLocationName !== '위치 설정 필요'
      ? selectedLocationName
      : undefined,
    selectedCategoryId || undefined,
    sortOption,
    includeCompleted
  );

  // 상태별 필터링
  const filteredData = useMemo(() => {
    if (!selectedStatuses || !auctionsData?.data) return auctionsData?.data;

    return auctionsData.data.filter((auction) =>
      selectedStatuses.includes(auction.status as AuctionStatus)
    );
  }, [auctionsData?.data, selectedStatuses]);

  const convertToAuctionItemProps = (auction: AuctionListItem): AuctionItemProps => {
    // 기존 코드 동일
    const now = new Date();
    const endTime = new Date(auction.endTime);
    const isAuctionActive = auction.status === 'ACTIVE' && now < endTime;
    const auctionStatus = isAuctionActive ? '경매중' : '경매종료';

    return {
      id: auction.id,
      title: auction.title,
      status: auctionStatus,
      originalPrice: auction.auctionPrice?.startPrice || 0,
      currentPrice: auction.auctionPrice?.currentPrice || 0,
      deadline:
        auction.endTime instanceof Date
          ? auction.endTime.toISOString()
          : auction.endTime || new Date().toISOString(),
      thumbnailUrl: auction.thumbnailUrl || '',
    };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-lg text-neutral-600">경매 목록을 불러오는 중...</div>
      </div>
    );
  }

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
      {filteredData && filteredData.length > 0 ? (
        filteredData.map((auction) => {
          const auctionItemProps = convertToAuctionItemProps(auction);
          return <AuctionCard key={auction.id} {...auctionItemProps} />;
        })
      ) : (
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
