'use client';

import { AuctionCard, FilterTab } from '@/components/common';

import { useSearch } from '@/hooks/queries/search';

import { AUCTION_TABS_BASIC } from '@/lib/constants/tabs';
import { AuctionListItem } from '@/lib/types/auction-prisma';
import { TabId } from '@/lib/types/filter';
import { useFilterStore, useSortStore } from '@/lib/zustand/store';

interface SearchResultsProps {
  query: string;
}

// 검색 탭 ID를 API 상태 파라미터로 매핑
const SEARCH_TAB_TO_STATUS_MAP = {
  all: 'all',
  ongoing: 'active',
  completed: 'completed',
} as const;

const SearchResult = ({ query }: SearchResultsProps) => {
  const selectedTab = (useFilterStore((store) => store.selectedItems.search) ?? 'all') as TabId;
  const sortOption = useSortStore((state) => state.sortOption);

  // 탭 ID를 API 파라미터로 변환
  const statusParam =
    SEARCH_TAB_TO_STATUS_MAP[selectedTab as keyof typeof SEARCH_TAB_TO_STATUS_MAP] || 'all';

  // 검색 API 호출
  const {
    data: searchData,
    isLoading,
    error,
    refetch,
  } = useSearch(
    query,
    {
      status: statusParam as 'all' | 'active' | 'completed',
      sort: sortOption,
    },
    !!query?.trim()
  );

  // API에서 이미 필터링된 데이터를 받으므로 클라이언트 필터링 불필요
  const filteredData = searchData?.data || [];

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-lg text-neutral-600">검색 중...</div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <div className="text-danger-600 text-lg">검색 중 오류가 발생했습니다.</div>
        <button
          onClick={() => refetch()}
          className="bg-primary-500 hover:bg-primary-600 rounded-lg px-4 py-2 text-white transition-colors"
        >
          다시 시도
        </button>
      </div>
    );
  }

  // 검색 결과 없음
  if (!searchData?.data || searchData.data.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <FilterTab filterKey={'search'} items={AUCTION_TABS_BASIC} />
        <div className="flex h-full items-center justify-center text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="text-neutral-400">
              <svg className="h-16 w-16" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="mb-1 text-lg font-medium text-neutral-900">검색 결과가 없습니다</h3>
              <p className="text-neutral-600">'{query}' 에 대한 검색 결과가 없습니다.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // AuctionItemProps 변환 함수
  const convertToAuctionItemProps = (auction: AuctionListItem) => {
    const now = new Date();
    const endTime = new Date(auction.endTime);
    const isAuctionActive = auction.status === 'ACTIVE' && now < endTime;
    const auctionStatus = isAuctionActive ? '경매중' : '경매종료';

    return {
      id: auction.id,
      title: auction.title,
      status: auctionStatus as '경매중' | '경매종료',
      originalPrice: auction.auctionPrice?.startPrice || 0,
      currentPrice: auction.auctionPrice?.currentPrice || 0,
      deadline:
        auction.endTime instanceof Date
          ? auction.endTime.toISOString()
          : auction.endTime || new Date().toISOString(),
      thumbnailUrl: auction.thumbnailUrl || '',
    };
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 상태별 필터 탭 */}
      <FilterTab filterKey={'search'} items={AUCTION_TABS_BASIC} />
      {/* 검색 결과 개수 표시 */}
      <div className="text-sm text-neutral-600">
        '{query}' 검색 결과 {searchData.total}개
      </div>
      {/* 검색 결과 목록 */}
      {filteredData.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filteredData.map((auction: AuctionListItem) => {
            const auctionItemProps = convertToAuctionItemProps(auction);
            return <AuctionCard key={auction.id} {...auctionItemProps} />;
          })}
        </div>
      ) : (
        <div className="flex h-32 items-center justify-center text-neutral-600">
          해당 조건에 맞는 검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
};

export default SearchResult;
