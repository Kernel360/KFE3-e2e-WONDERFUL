'use client';

import HeaderWrapper from '@/components/layout/header/wrapper';
import { ChevronLeftIcon, Settings } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const ProfileHeader = () => {
  const routes = useRouter();
  const pathname = usePathname();
  const lastPath = pathname.split('/').filter(Boolean);
  const depthName = lastPath[lastPath.length - 1];

  return (
    <HeaderWrapper className="bg-white">
      {depthName === 'profile' ? (
        <>
          <h2 className="text-h4 font-bold">나의 프로필</h2>
          <Settings />
        </>
      ) : (
        <>
          <button type="button" onClick={() => routes.back()}>
            <ChevronLeftIcon />
          </button>
        </>
      )}
    </HeaderWrapper>
  );
};

export default ProfileHeader;
