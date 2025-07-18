import { FilterTab } from '@/components/common';

import { useCategories } from '@/hooks/queries/category/useCategories';

import { TabItem } from '@/types/filter';

const CategoriesFilter = () => {
  // 카테고리 목록 조회 (분리된 API)
  const { data: categoriesData, isLoading, error } = useCategories();

  if (!categoriesData) return null;

  const updateCategories: TabItem[] = [{ id: '', name: '전체' }];
  categoriesData.data.forEach((item) => {
    updateCategories.push(item);
  });

  return <FilterTab filterKey="category" items={updateCategories} />;
};

export default CategoriesFilter;
