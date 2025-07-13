'use client';
// 마이페이지 - 판매 내역 페이지

import { AuctionItemList } from '@/components/common/auction-card';
import FilterTab from '@/components/common/tab/filter';

import { AUCTION_TABS_EXTENDED, TAB_STATUS_MAP } from '@/lib/constants/tabs';
import { useFilterStore } from '@/lib/zustand/store';

import { TabId } from '@/types/filter';

const TradeListPage = () => {
  const selectedTab = useFilterStore((store) => store.selectedItems.trade) as TabId;

  return (
    <div>
      {/* 상단 헤더 */}
      <FilterTab filterKey="trade" items={AUCTION_TABS_EXTENDED} />
      <AuctionItemList selectedStatuses={TAB_STATUS_MAP[selectedTab]} includeCompleted={true} />
    </div>
  );
};

export default TradeListPage;
