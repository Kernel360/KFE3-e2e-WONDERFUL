// apps/web/src/lib/zustand/store/sortStore.ts
import { create } from 'zustand';

import { SortOption } from '@/lib/types/auction-prisma';

interface SortState {
  sortOption: SortOption;
  setSortOption: (sort: SortOption) => void;
}

export const useSortStore = create<SortState>((set) => ({
  sortOption: 'latest', // 기본값: 최신순
  setSortOption: (sort: SortOption) => set({ sortOption: sort }),
}));
