'use client';
// 마이페이지 - 판매 내역 페이지
import { useState } from 'react';

import { AuctionItemList, TabListFilter } from '@/components/common';

import { AUCTION_TABS, AUCTION_TABS_EXTENDED, TAB_STATUS_MAP, TabId } from '@/lib/constants/tabs';

const TradeListPage = () => {
  const [selectedTab, setSelectedTab] = useState<TabId>(AUCTION_TABS[0]?.id || 'all');

  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId as TabId);
  };

  return (
    <div>
      {/* 상단 헤더 */}
      {/* <div className="absolute left-0 top-0 z-10 w-full">
        <Header title="판매 내역" />
      </div> */}

      <TabListFilter
        items={AUCTION_TABS_EXTENDED}
        selectedCategoryId={selectedTab}
        onCategoryChange={handleTabChange}
      />
      <AuctionItemList selectedStatuses={TAB_STATUS_MAP[selectedTab]} includeCompleted={true} />
    </div>
  );
};

export default TradeListPage;
