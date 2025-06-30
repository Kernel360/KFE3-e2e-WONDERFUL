'use client';

import { useState } from 'react';

import AuctionItemList from '@/components/common/auction-item-List';
import Categories from '@/components/common/categories';

import { useSortStore } from '@/lib/zustand/store/sort-store';

import { CATEGORIES } from '../lib/constants/tabs';

const HomePage = () => {
  // 카테고리 필터링은 로컬 상태로 관리 (ID 직접 사용)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(''); // 전체

  // 정렬은 Zustand 전역 상태로 관리 (헤더와 공유)
  const sortOption = useSortStore((state) => state.sortOption);

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
        items={CATEGORIES}
        selectedCategoryId={selectedCategoryId}
        onCategoryChange={handleCategoryChange}
      />

      {/* 경매 목록 (필터링 + 정렬) */}
      <AuctionItemList selectedCategoryId={selectedCategoryId} sortOption={sortOption} />
    </section>
  );
};

export default HomePage;
