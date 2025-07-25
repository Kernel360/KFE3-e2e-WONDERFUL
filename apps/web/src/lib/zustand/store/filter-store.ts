import { create } from 'zustand';

import { FilterState } from '@/types/filter';

export const useFilterStore = create<FilterState>((set) => ({
  selectedItems: {
    category: '',
    auctionBasic: 'all',
    auctionExtended: 'all',
    chatStatus: 'all',
    search: 'all',
  },
  setSelectedItem: (filterKey, itemId) =>
    set((state) => ({
      selectedItems: {
        ...state.selectedItems,
        [filterKey]: itemId,
      },
    })),
}));
