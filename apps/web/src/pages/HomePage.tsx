'use client';

import { useMemo, useState } from 'react';

import AuctionItemList from '@/components/common/auction-item-List';
import Categories from '@/components/common/categories';
import CreateAuctionButton from '@/components/common/craete-auction-button';

import { useCategories } from '@/hooks/queries/category/useCategories';

import { FALLBACK_CATEGORIES, TabItem } from '@/lib/constants/tabs';
import { useLocationStore } from '@/lib/zustand/store/location-store';

const HomePage = () => {
  // 카테고리 필터링은 로컬 상태로 관리 (ID 직접 사용)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(''); // 전체

  // 정렬은 Zustand 전역 상태로 관리 (헤더와 공유)
  const selectedLocationId = useLocationStore((state) => state.selectedLocationId);

  // 카테고리 목록 조회 (분리된 API)
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useCategories();

  // 카테고리 데이터 변환
  const categories: TabItem[] = useMemo(() => {
    if (isCategoriesLoading || categoriesError || !categoriesData?.data) {
      return FALLBACK_CATEGORIES;
    }

    return [
      { id: '', name: '전체' },
      ...categoriesData.data.map((category) => ({
        id: category.id,
        name: category.name,
      })),
    ];
  }, [categoriesData, isCategoriesLoading, categoriesError]);

  // 카테고리 변경 핸들러 (ID를 직접 사용)
  const handleCategoryChange = (categoryId: string) => {
    console.log('=== Category Change Debug ===');
    console.log('Selected category ID:', categoryId);
    setSelectedCategoryId(categoryId);
  };

  return (
    <section>
      {/* 카테고리 필터링 탭 */}
      <Categories
        items={categories}
        selectedCategoryId={selectedCategoryId}
        onCategoryChange={handleCategoryChange}
      />

      {/* 경매 목록 (필터링 + 정렬) */}
      <AuctionItemList
        selectedCategoryId={selectedCategoryId}
        selectedLocationId={selectedLocationId}
        includeCompleted={true} // 종료된 경매 포함 (true: 포함, false: 미포함)
      />

      <CreateAuctionButton />
    </section>
  );
};
export async function getServerSideProps() {
  return {
    props: {},
  };
}

export const dynamic = 'force-dynamic';
export default HomePage;
