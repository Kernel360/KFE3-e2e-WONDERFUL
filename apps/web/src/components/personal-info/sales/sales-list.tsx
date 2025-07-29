'use client';

import { useEffect, useRef } from 'react';

import { FilterTab, AuctionCard } from '@/components/common';

import { useMySales } from '@/hooks/queries/profile';

import { AUCTION_TABS_BASIC } from '@/lib/constants/tabs';
import { convertToAuctionItemProps } from '@/lib/utils/auction';
import { useFilterStore } from '@/lib/zustand/store';

import { AuctionStatus } from '@/types/filter';

// 기본 탭 ID 타입 정의
type BasicTabId = 'all' | 'ongoing' | 'completed';

// 탭 ID와 상태 매핑
const TAB_STATUS_MAP: Record<BasicTabId, AuctionStatus[]> = {
  all: ['ACTIVE', 'COMPLETED', 'CANCELLED'],
  ongoing: ['ACTIVE'],
  completed: ['COMPLETED', 'CANCELLED'],
};

interface SalesListProps {
  userId: string;
}

const SalesList = ({ userId }: SalesListProps) => {
  const selectedTab = (useFilterStore((store) => store.selectedItems.trade) || 'all') as BasicTabId;
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useMySales(TAB_STATUS_MAP[selectedTab]);

  // 모든 페이지의 데이터를 하나로 합치기
  const allSales = data?.pages.flatMap((page) => page.data) || [];

  // Intersection Observer로 무한 스크롤 구현
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target?.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div>
        <FilterTab filterKey="trade" items={AUCTION_TABS_BASIC} />
        <div className="flex items-center justify-center py-16">
          <div className="text-lg text-neutral-600">판매 내역을 불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <FilterTab filterKey="trade" items={AUCTION_TABS_BASIC} />
        <div className="flex flex-col items-center justify-center gap-4 py-16">
          <div className="text-danger-600 text-lg">
            판매 내역을 불러오는 중 오류가 발생했습니다.
          </div>
          <button
            onClick={() => refetch()}
            className="bg-primary-500 hover:bg-primary-600 rounded-lg px-4 py-2 text-white transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <FilterTab filterKey="trade" items={AUCTION_TABS_BASIC} />

      <div className="flex flex-col gap-3">
        {allSales.length > 0 ? (
          allSales.map((auction) => {
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
            <h3 className="mb-1 text-lg font-medium text-neutral-900">등록한 경매가 없습니다</h3>
            <p className="text-neutral-600">아직 등록한 경매가 없습니다.</p>
          </div>
        )}
      </div>

      {/* 무한 스크롤 트리거 & 로딩 표시 */}
      <div ref={loadMoreRef} className="flex justify-center py-4">
        {isFetchingNextPage ? (
          <div className="text-neutral-600">불러오는 중...</div>
        ) : hasNextPage ? (
          <div className="text-neutral-400">스크롤해서 더 보기</div>
        ) : allSales.length > 0 ? (
          <div className="text-neutral-400">마지막 게시글</div>
        ) : null}
      </div>
    </div>
  );
};

export default SalesList;
