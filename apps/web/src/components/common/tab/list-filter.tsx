import { FilterTabs, FilterTabsList, FilterTabsTrigger } from '@/components/ui/tab-filter';

import { TabItem } from '@/lib/constants/tabs';

interface CategoriesProps {
  items: TabItem[];
  selectedCategoryId?: string;
  onCategoryChange?: (categoryId: string) => void;
}

const TabListFilter = ({ items, selectedCategoryId, onCategoryChange }: CategoriesProps) => {
  if (!items || items.length === 0) {
    return <div>카테고리가 없습니다.</div>;
  }

  // 탭 값 변경 핸들러
  const handleTabsValueChange = (value: string) => {
    console.log('Tab changed to:', value);
    if (onCategoryChange) {
      onCategoryChange(value);
    }
  };

  // 기본값: 선택된 카테고리 ID 또는 첫 번째 아이템의 id
  const defaultValue = selectedCategoryId !== undefined ? selectedCategoryId : items[0]?.id || '';
  return (
    <FilterTabs value={defaultValue} onValueChange={handleTabsValueChange}>
      <FilterTabsList className="my-3 w-fit">
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

export default TabListFilter;
