import { useFilterStore } from '@/lib/zustand/store/filter-store';

import { FilterKey } from '@/types/filter';

const useFilterChange = (filterKey: FilterKey) => {
  const selectedItem = useFilterStore((state) => state.selectedItems[filterKey]);
  const setSelectedItem = useFilterStore((state) => state.setSelectedItem);

  const handleChangeItem = (itemId: string) => {
    setSelectedItem(filterKey, itemId);
  };

  return { selectedItem, handleChangeItem };
};

export default useFilterChange;
