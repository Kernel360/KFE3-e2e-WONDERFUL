import { create } from 'zustand';

import { FilterState } from '@/types/filter';

export const useFilterStore = create<FilterState>((set) => ({
  selectedItems: {
    category: undefined,
    auctionBasic: undefined,
    auctionExtended: undefined,
    chatStatus: undefined,
  },
  setSelectedItem: (filterKey, itemId) =>
    set((state) => ({
      selectedItems: {
        ...state.selectedItems,
        [filterKey]: itemId,
      },
    })),
}));
