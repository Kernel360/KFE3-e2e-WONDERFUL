'use client';

import { Bell } from 'lucide-react';

import Header from './Header';
import Navigation from './Navigation';
interface MainLayoutProps {
  children: React.ReactNode;
}
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="mx-auto flex h-screen min-w-[320px] max-w-[480px] flex-col">
      {/* 상품 목록 - 카테고리 선택 + 제목 + 필터 */}
      <Header
        leftContent={
          <select className="rounded border border-gray-300 bg-white p-1 text-sm">
            <option value="all">전체</option>
            <option value="electronics">전자제품</option>
            <option value="clothing">의류</option>
            <option value="books">도서</option>
          </select>
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
