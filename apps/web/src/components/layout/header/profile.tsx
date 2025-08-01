'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

import { HeaderWrapper } from '@/components/layout/';
import { Button } from '@/components/ui';

interface HeaderInfo {
  title: string;
  showBackButton: boolean;
}

const HEADER_CONFIG: Record<string, HeaderInfo> = {
  '/profile': { title: '나의 프로필', showBackButton: false },
  '/profile/sales': { title: '판매목록', showBackButton: true },
  '/profile/purchases': { title: '구매목록', showBackButton: true },
  '/profile/wishlist': { title: '관심목록', showBackButton: true },
  '/profile/location': { title: '내 동네 설정', showBackButton: true },
  '/profile/support': { title: '공지사항', showBackButton: true },
  '/profile/settings': { title: '설정', showBackButton: true },
};

const ProfileHeader = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { title, showBackButton } = HEADER_CONFIG[pathname] || {
    title: '프로필',
    showBackButton: true,
  };

  return (
    <HeaderWrapper className="relative flex h-14 items-center justify-between bg-white">
      {showBackButton ? (
        <Button
          variant="solid"
          color="transparent"
          onClick={router.back}
          className="p-2"
          aria-label="뒤로가기"
        >
          <ChevronLeft size={24} />
        </Button>
      ) : (
        <div className="w-10" />
      )}

      <h2 className="text-h4 flex-1 text-center font-bold">{title}</h2>

      <div className="w-10" />
    </HeaderWrapper>
  );
};

export default ProfileHeader;
