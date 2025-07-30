'use client';

import { useEffect, useState } from 'react';

import { FilterTab } from '@/components/common';

import { useCategories } from '@/hooks/queries/category/useCategories';

import { TabItem } from '@/types/filter';

const CategoriesFilter = () => {
  const [mounted, setMounted] = useState(false);
  const { data: categoriesData, isLoading } = useCategories();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="my-3 flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-89 h-[35px] animate-pulse rounded bg-neutral-200" />
        ))}
      </div>
    ); // 초기 마운트 전 로딩 상태에서의 스켈레톤 UI
  }

  if (isLoading || !categoriesData) {
    return (
      <div className="mb-4 flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-89 h-[35px] animate-pulse rounded bg-neutral-200" />
        ))}
      </div>
    ); // 로딩 상태에서의 스켈레톤 UI
  }

  const updateCategories: TabItem[] = [{ id: '', name: '전체' }];
  categoriesData.data.forEach((item) => {
    updateCategories.push(item);
  });

  return <FilterTab filterKey="category" items={updateCategories} />;
};

export default CategoriesFilter;
