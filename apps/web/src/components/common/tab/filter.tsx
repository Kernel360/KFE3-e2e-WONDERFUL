'use client';

import { FilterTabs, FilterTabsList, FilterTabsTrigger } from '@/components/ui/tab-filter';

import useFilterChange from '@/hooks/common/useFilterItem';

import { FilterTabProps } from '@/lib/types/filter';

const FilterTab = ({ filterKey, items }: FilterTabProps) => {
  const { selectedItem, handleChangeItem } = useFilterChange(filterKey);

  if (!items) return null;

  return (
    <FilterTabs
      value={selectedItem ?? items[0]?.id}
      onValueChange={handleChangeItem}
      className="my-3"
    >
      <FilterTabsList>
        {items.map(({ id, name }) => (
          <FilterTabsTrigger key={id} value={id}>
            {name}
          </FilterTabsTrigger>
        ))}
      </FilterTabsList>
    </FilterTabs>
  );
};

export default FilterTab;
