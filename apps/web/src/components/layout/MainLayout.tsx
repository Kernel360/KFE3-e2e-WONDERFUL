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
  const [selectedFruit, setSelectedFruit] = useState('');
  const fruitOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'grapes', label: 'Grapes' },
    { value: 'pineapple', label: 'Pineapple' },
  ];
  return (
    <div className="mx-auto flex h-screen min-w-[320px] max-w-[480px] flex-col">
      {/* 상품 목록 - 카테고리 선택 + 제목 + 필터 */}
      <Header
        leftContent={
          <SelectBox
            options={fruitOptions}
            placeholder="과일을 선택하세요"
            value={selectedFruit}
            onValueChange={setSelectedFruit}
            className="w-[200px]"
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
