// 경매 상태 타입
export type AuctionStatus = 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'EXPIRED';

// 탭 ID 타입
export type TabId = 'all' | 'ongoing' | 'completed' | 'cancelled';

// filter-store key 타입
export type FilterKey = 'category' | 'auctionBasic' | 'auctionExtended';

//filter-tab 의 item 타입
export interface TabItem {
  id: string;
  name: string;
}

//filter-tab 컴포넌트 props
export interface FilterTabProps {
  filterKey: 'category' | 'auctionBasic' | 'auctionExtended';
  items: TabItem[];
}
// filter-store State
export interface FilterState {
  selectedItems: Record<FilterKey, string | undefined>;
  setSelectedItem: (filterKey: FilterKey, itemId: string) => void;
}
