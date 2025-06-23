'use client';

import { useState } from 'react';

import { Bell } from 'lucide-react';

import { SelectBox } from '@/components/common/SelectBox';

import Header from './Header';
import Navigation from './Navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}
const MainLayout = ({ children }: MainLayoutProps) => {
  const [selectedState, setSelectedState] = useState('');
  const stateOptions = [
    { value: 'all', label: '전체' },
    { value: 'active', label: '진행중' },
    { value: 'completed', label: '완료' },
    { value: 'pending', label: '대기' },
  ];
  return (
    <div className="mx-auto flex h-screen min-w-[320px] max-w-[480px] flex-col">
      {/* 상품 목록 - 카테고리 선택 + 제목 + 필터 */}
      <Header
        leftContent={
          <SelectBox
            options={stateOptions}
            placeholder="상태"
            value={selectedState}
            onValueChange={setSelectedState}
            // className="w-[100px]" // 다른 너비 지정
          />
        }
        rightIcon={Bell}
        className="bg-white"
      />

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 overflow-auto bg-white p-[15px]">{children}</main>
      {/* 하단 탭 메뉴 */}
      <Navigation />
    </div>
  );
};

export default MainLayout;
