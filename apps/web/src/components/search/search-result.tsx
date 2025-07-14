'use client';

import { AuctionItemList } from '@/components/common/auction-card';
import FilterTab from '@/components/common/tab/filter';

import { TabId } from '@/lib/types/filter';
import { useFilterStore } from '@/lib/zustand/store';

import { AUCTION_TABS_BASIC, TAB_STATUS_MAP } from '@/constants/tabs';

interface SearchResultsProps {
  query: string;
}

const SearchResult = ({ query }: SearchResultsProps) => {
  const selectedTab = (useFilterStore((store) => store.selectedItems.search) ?? 'all') as TabId;
  const results = [];

  /* TODO
   * api 요청 로직 추가
   * - 결과 있을 때 리스트 반환
   */

  if (results.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-center">
        <p className="font-medium"> {query} 검색 결과가 없습니다</p>
      </div>
    );
  }

  return (
    <>
      <FilterTab filterKey={'search'} items={AUCTION_TABS_BASIC} />
      <AuctionItemList selectedStatuses={TAB_STATUS_MAP[selectedTab]} includeCompleted={true} />
    </>
  );
};

export default SearchResult;
