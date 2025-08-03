'use client';

import { useMemo } from 'react';

import { ListX } from 'lucide-react';

import AuctionCardSkeleton from '@/components/auction/auction-card-skeleton';
import { AuctionCard } from '@/components/common';

import { useAuctions } from '@/hooks/queries/auction';

import { SortOption } from '@/lib/types/auction-prisma';
import { convertToAuctionItemProps } from '@/lib/utils/auction';
import { useFilterStore, useLocationStore } from '@/lib/zustand/store';

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

  if (isLoading) {
    return (
      <div className="flex min-h-[100vhd] flex-col gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <AuctionCardSkeleton key={index} />
        ))}
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
    <div className="flex flex-col">
      {filteredData && filteredData.length > 0 ? (
        filteredData.map((auction, idx) => {
          const auctionItemProps = convertToAuctionItemProps(auction);
          return <AuctionCard key={auction.id} {...auctionItemProps} idx={idx} />;
        })
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="mb-2 text-neutral-400">
            <ListX size={60} />
          </div>
          <p className="text-neutral-600">진행 중인 경매가 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default AuctionItemList;
