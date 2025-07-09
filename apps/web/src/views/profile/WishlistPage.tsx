'use client';
// 마이페이지 - 관심목록 페이지
import { useState } from 'react';

import { AuctionItemList } from '@/components/common/auction-card';
import { TabListFilter } from '@/components/common/tab';

import { AUCTION_TABS, AUCTION_TABS_BASIC, TAB_STATUS_MAP, TabId } from '@/lib/constants/tabs';

const WishlistPage = () => {
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
        items={AUCTION_TABS_BASIC}
        selectedCategoryId={selectedTab}
        onCategoryChange={handleTabChange}
      />
      <AuctionItemList selectedStatuses={TAB_STATUS_MAP[selectedTab]} includeCompleted={true} />
    </div>
  );
};

export default WishlistPage;
