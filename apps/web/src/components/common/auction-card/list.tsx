'use client';

import { useMemo } from 'react';

import { ListX } from 'lucide-react';

import AuctionItemCardSkeleton from '@/components/auction/auction-card-skeleton';
import { AuctionCard } from '@/components/common';

import { useAuctions } from '@/hooks/queries/auction';

import { SortOption } from '@/lib/types/auction-prisma';
import { convertToAuctionItemProps } from '@/lib/utils/auction';
import { useFilterStore, useLocationStore } from '@/lib/zustand/store';

import { AuctionStatus } from '@/types/filter';

interface AuctionItemListProps {
  sortOption?: SortOption;
  includeCompleted?: boolean;
  selectedStatuses?: AuctionStatus[];
}

const AuctionItemList = ({
  sortOption = 'latest',
  includeCompleted = false,
  selectedStatuses,
}: AuctionItemListProps) => {
  const selectedCategoryId = useFilterStore((state) => state.selectedItems.category);

  const selectedLocationName = useLocationStore((state) => state.selectedLocation.locationName);

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

  const filteredData = useMemo(() => {
    if (!auctionsData?.data) return [];

    let data = auctionsData.data;

    if (!includeCompleted) {
      data = data.filter((auction) => auction.status !== 'COMPLETED');
    }

    if (selectedStatuses && selectedStatuses.length > 0) {
      data = data.filter((auction) => selectedStatuses.includes(auction.status as AuctionStatus));
    }

    return data;
  }, [auctionsData?.data, selectedStatuses, includeCompleted]);

  if (isLoading) {
    return (
      <div className="flex min-h-[100vhd] flex-col gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <AuctionItemCardSkeleton key={index} />
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
