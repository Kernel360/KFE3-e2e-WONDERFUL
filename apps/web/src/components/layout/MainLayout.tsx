'use client';

import { useRouter } from 'next/navigation';

import { Bell } from 'lucide-react';

import Header from './Header';
import Navigation from './Navigation';
interface MainLayoutProps {
  children: React.ReactNode;
}
const MainLayout = ({ children }: MainLayoutProps) => {
  const route = useRouter();
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
      {/* shadcn/ui 예시 */}
      {/* <Header
      title="프로젝트 관리"
      leftContent={
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-24 h-8 text-sm border-none">
            <SelectValue placeholder="상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="active">진행중</SelectItem>
            <SelectItem value="completed">완료</SelectItem>
            <SelectItem value="pending">대기</SelectItem>
          </SelectContent>
        </Select>
      }
      rightIcon={Bell}
      className="bg-white"
    /> */}
      {/* <Header
        leftIcon={ChevronLeft}
        onLeftClick={() => route.back()}
        title="내 위치 선택"
        rightIcon={EllipsisVertical}
        className="bg-white"
      />

      <Header
        title="좌우 아이콘이 없는 텍스트 헤더입니다"
        hideLeft
        hideRight
        className="bg-white"
      />

      <Header rightIcon={Bell} className="bg-white" />
      <Header
        leftIcon={ChevronLeft}
        onLeftClick={() => route.back()}
        title="헤더 타이틀"
        className="bg-white"
      />
      <Header leftIcon={ChevronLeft} onLeftClick={() => route.back()} className="bg-white" />
      <Header rightIcon={EllipsisVertical} onLeftClick={() => {}} className="bg-white" /> */}

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 overflow-auto bg-white p-[15px]">{children}</main>
      {/* 하단 탭 메뉴 */}
      <Navigation />
    </div>
  );
};

export default MainLayout;
