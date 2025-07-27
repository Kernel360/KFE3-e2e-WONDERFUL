'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Settings, ChevronLeft } from 'lucide-react';

import { HeaderWrapper } from '@/components/layout/';
import { Button } from '@/components/ui';

// 헤더 정보 타입 정의
interface HeaderInfo {
  title: string;
  showBackButton: boolean;
  showSettingsButton: boolean;
}

// 경로별 헤더 설정
const HEADER_CONFIG: Record<string, HeaderInfo> = {
  '/profile': {
    title: '나의 프로필',
    showBackButton: false,
    showSettingsButton: true,
  },
  '/profile/sales': {
    title: '판매내역',
    showBackButton: true,
    showSettingsButton: false,
  },
  '/profile/purchases': {
    title: '구매 내역',
    showBackButton: true,
    showSettingsButton: false,
  },
  '/profile/wishlist': {
    title: '관심 목록',
    showBackButton: true,
    showSettingsButton: false,
  },
  '/profile/location': {
    title: '위치 정보 설정',
    showBackButton: true,
    showSettingsButton: false,
  },
  '/profile/support': {
    title: '고객 센터',
    showBackButton: true,
    showSettingsButton: false,
  },
  '/profile/settings': {
    title: '설 정',
    showBackButton: true,
    showSettingsButton: false,
  },
};

const ProfileHeader = () => {
  const pathname = usePathname();
  const router = useRouter();

  // 현재 경로의 헤더 정보 가져오기
  const headerInfo = HEADER_CONFIG[pathname] || {
    title: '프로필',
    showBackButton: true,
    showSettingsButton: false,
  };

  const { title, showBackButton, showSettingsButton } = headerInfo;

  const handleBackClick = () => {
    router.back();
  };

  const handleSettingsClick = () => {
    console.log('설정클릭');
  };

  return (
    <HeaderWrapper className="bg-white">
      <div className="flex items-center">
        {showBackButton && (
          <Button
            variant="solid"
            color="transparent"
            onClick={handleBackClick}
            className="-ml-2 p-2"
          >
            <ChevronLeft size={24} />
          </Button>
        )}
      </div>

      <div className="absolute left-1/2 -translate-x-1/2">
        <h2 className="text-h4 font-bold">{title}</h2>
      </div>

      <div className="flex items-center">
        {showSettingsButton && (
          <Button
            variant="solid"
            color="transparent"
            onClick={handleSettingsClick}
            className="-mr-2 p-2"
          >
            <Settings size={24} />
          </Button>
        )}
      </div>
    </HeaderWrapper>
  );
};

export default ProfileHeader;
