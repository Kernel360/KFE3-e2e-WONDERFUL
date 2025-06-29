'use client';

import { usePathname } from 'next/navigation';

import DynamicHeader from './dynamic-header';
import Navigation from './navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}
const MainLayout = ({ children }: MainLayoutProps) => {
  const pathname = usePathname();
  // 🧭 하단 탭 네비게이션이 표시될 페이지들
  const showNavigation = ['/', '/auction', '/search', '/chat', '/profile'].includes(pathname || '');

  // 📱 페이지별 메인 컨텐츠 패딩 설정
  const getMainPadding = () => {
    // 인증 페이지들은 패딩 없음
    if (pathname?.startsWith('/auth') || pathname?.startsWith('/onboarding')) {
      return '';
    }

    // 상세 페이지들은 패딩 없음 (이미지나 콘텐츠가 전체 영역 사용할 수 있도록)
    if (pathname?.includes('/auction/') && pathname !== '/auction') {
      return '';
    }

    // 채팅 페이지도 패딩 없음
    if (pathname?.startsWith('/chat/') && pathname !== '/chat') {
      return '';
    }

    // 검색 페이지도 패딩 없음
    if (pathname?.startsWith('/search')) {
      return '';
    }

    // 기본 패딩
    return 'p-[15px]';
  };

  return (
    <div className="mx-auto flex h-screen min-w-[320px] max-w-[480px] flex-col">
      {/* 동적 헤더 */}
      <DynamicHeader />

      {/* 메인 콘텐츠 영역 */}
      <main className={`${getMainPadding()} flex-1 overflow-auto bg-white`}>{children}</main>
      {/* 하단 탭 메뉴 */}
      {showNavigation && <Navigation />}
    </div>
  );
};

export default MainLayout;
