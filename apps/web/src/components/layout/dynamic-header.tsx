import { usePathname, useRouter } from 'next/navigation';

import { BellRing, ChevronLeft, EllipsisVertical } from 'lucide-react';

import ButtonDetailMore from '@/components/auction-detail/button-detail-more';

import { useLocationStore } from '@/lib/zustand/store/location-store';

import Header from './header';
import HomeSelectBox from './home-selectbox';

const DynamicHeader = () => {
  const pathname: string | null = usePathname();
  const router = useRouter();

  const setLocation = useLocationStore((state) => state.setLocation);

  if (!pathname) {
    return null;
  }

  // 헤더 숨김 페이지들
  const hiddenPages = ['/auth', '/login', '/signup', '/onboarding', '/search'];
  if (hiddenPages.some((page) => pathname.startsWith(page))) {
    return null;
  }

  // 메인 홈 페이지(경매리스트) - (좌)셀렉트박스 + (우)알림
  if (pathname === '/') {
    return (
      <Header
        leftContent={
          <HomeSelectBox
            onLocationChange={(locationId, locationName) => {
              setLocation(locationId, locationName);
            }}
          />
        }
        rightIcon={BellRing}
        onRightClick={() => {
          // 알림 페이지로 이동
          router.push('/notifications');
        }}
        className="bg-white"
      />
    );
  }

  // // 검색 페이지 - (좌)뒤로가기 + (중)타이틀
  // if (pathname === '/search') {
  //   return (
  //     <Header
  //       leftIcon={ChevronLeft}
  //       title="검색"
  //       onLeftClick={() => router.back()}
  //       className="bg-white"
  //     />
  //   );
  // }

  // 경매 상세 페이지 - (좌)뒤로가기 + (우) 케밥
  if (pathname.includes('/auction/') && pathname !== '/auction') {
    return (
      <Header
        leftIcon={ChevronLeft}
        rightIcon={EllipsisVertical}
        onLeftClick={() => router.push('/')}
        rightContent={<ButtonDetailMore />}
        className="absolute left-0 top-auto z-10 w-full"
      />
    );
  }

  // 채팅 페이지들
  if (pathname.startsWith('/chat') && pathname === '/chat') {
    return (
      <Header
        title="채팅"
        // leftContent={<span className="text-[20px]">채팅</span>}
        rightIcon={BellRing}
        className="bg-white"
      />
    );
  } else if (pathname.startsWith('/chat/') && pathname !== '/chat') {
    // 개별 채팅방
    return (
      <Header
        title="거래자 닉네임" // 실제 채팅방 이름으로 변경 필요
        leftIcon={ChevronLeft}
        onLeftClick={() => router.back()}
        rightIcon={EllipsisVertical}
        onRightClick={() => {
          // 채팅방 설정 더보기 메뉴 클릭: 삭제, 신고 등
          console.log('채팅방 메뉴 더보기');
        }}
        className="bg-white"
      />
    );
  }

  // 프로필 페이지 - 제목 + 설정 버튼
  if (pathname === '/profile') {
    return (
      <Header
        title="프로필"
        leftIcon={ChevronLeft}
        onLeftClick={() => router.back()}
        rightIcon={EllipsisVertical}
        onRightClick={() => {
          //   router.push('/settings');
          console.log('프로필 설정 더 보기 메뉴 클릭');
        }}
        className="h-[51px] border-b bg-neutral-100 bg-white"
      />
    );
  }

  // 기본 헤더 (예상하지 못한 경로들) - (좌)뒤로가기
  return <Header leftIcon={ChevronLeft} onLeftClick={() => router.back()} className="bg-white" />;
};

export default DynamicHeader;
