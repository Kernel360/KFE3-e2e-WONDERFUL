'use client';

import { AuctionItemList, FilterTab } from '@/components/common';

import { AUCTION_TABS_BASIC, TAB_STATUS_MAP } from '@/lib/constants/tabs';
import { useFilterStore } from '@/lib/zustand/store';

import { TabId } from '@/types/filter';

const WishlistPage = () => {
  const selectedTab = useFilterStore((state) => state.selectedItems.whishlist) as TabId;

  return (
    <div>
      {/* 상단 헤더 */}
      <FilterTab filterKey="wishlist" items={AUCTION_TABS_BASIC} />
      <AuctionItemList selectedStatuses={TAB_STATUS_MAP[selectedTab]} includeCompleted={true} />
    </div>
  );
};

export default WishlistPage;
