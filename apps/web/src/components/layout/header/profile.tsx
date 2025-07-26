'use client';

import { usePathname } from 'next/navigation';

import { Settings } from 'lucide-react';

import { HeaderWrapper } from '@/components/layout/';

const ProfileHeader = () => {
  const pathname = usePathname();
  return (
    <HeaderWrapper className={'bg-white'}>
      {pathname === '/profile' && (
        <>
          <h2 className="text-h4 font-bold">나의 프로필</h2>
          <Settings />
        </>
      )}
    </HeaderWrapper>
  );
};

export default ProfileHeader;
