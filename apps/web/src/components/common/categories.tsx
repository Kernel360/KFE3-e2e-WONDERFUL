import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs-categories';

import { TabItem } from '@/lib/constants/tabs';

interface CategoriesProps {
  items: TabItem[];
  selectedCategoryId?: string;
  onCategoryChange?: (categoryId: string) => void;
}

const Categories = ({ items, selectedCategoryId, onCategoryChange }: CategoriesProps) => {
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
    <Tabs value={defaultValue} onValueChange={handleTabsValueChange}>
      <TabsList className="my-3">
        {items.map(({ id, name }) => {
          return (
            <TabsTrigger key={id} value={id}>
              {name}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export default Categories;
