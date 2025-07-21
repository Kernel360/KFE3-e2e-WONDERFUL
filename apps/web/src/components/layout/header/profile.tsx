'use client';

import { usePathname } from 'next/navigation';

import { Settings } from 'lucide-react';

import { HeaderWrapper } from '@/components/layout/';

//위치 모달 테스트용 추후에 삭제
import { useLocationModalStore } from '@/lib/zustand/store/location-modal-store';

const ProfileHeader = () => {
  const pathname = usePathname();
  //위치 모달 호출(test) 추후에 삭제할예정
  const handleClick = () => {
    const { openLocationModal } = useLocationModalStore.getState();
    openLocationModal();
  };
  return (
    <HeaderWrapper className={'bg-white'}>
      {pathname === '/profile' && (
        <>
          <h2 className="text-h4 font-bold">나의 프로필</h2>
          {/* 위치 모달 클릭 이벤트 */}
          <Settings onClick={handleClick} />
        </>
      )}
    </HeaderWrapper>
  );
};

export default ProfileHeader;
