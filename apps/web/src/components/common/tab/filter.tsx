import { FilterTabs, FilterTabsList, FilterTabsTrigger } from '@/components/ui/tab-filter';

import { TabItem } from '@/lib/constants/tabs';

interface FilterTabProps {
  items: TabItem[];
}
const FilterTab = ({ items }: FilterTabProps) => {
  return (
    <FilterTabs defaultValue={items[0]!.id} className="my-3">
      <FilterTabsList>
        {items.map(({ id, name }) => {
          return (
            <FilterTabsTrigger key={id} value={id}>
              {name}
            </FilterTabsTrigger>
          );
        })}
      </FilterTabsList>
    </FilterTabs>
  );
};

export default FilterTab;
