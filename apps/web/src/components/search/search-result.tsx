'use client';

import { useState } from 'react';

import { AuctionItemList } from '@/components/common/auction-card';
import { TabListFilter } from '@/components/common/tab';

import { AUCTION_TABS, AUCTION_TABS_BASIC, TAB_STATUS_MAP, TabId } from '@/constants/tabs';

interface SearchResultsProps {
  query: string;
}

const SearchResult = ({ query }: SearchResultsProps) => {
  const [selectedTab, setSelectedTab] = useState<TabId>(AUCTION_TABS[0]?.id || 'all');

  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId as TabId);
  };

  const results = [];

  /* TODO
   * api 요청 로직 추가
   * - 결과 있을 때 리스트 반환
   */

  if (results.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-center">
        <p className="font-medium"> "{query}" 검색 결과가 없습니다</p>
      </div>
    );
  }

  return (
    <>
      <TabListFilter
        items={AUCTION_TABS_BASIC}
        selectedCategoryId={selectedTab}
        onCategoryChange={handleTabChange}
      />
      <AuctionItemList selectedStatuses={TAB_STATUS_MAP[selectedTab]} includeCompleted={true} />
    </>
  );
};

export default SearchResult;
