'use client';

import { useRouter } from 'next/navigation';

import { ChevronLeftIcon } from 'lucide-react';

import { HeaderWrapper } from '@/components/layout';
import { Button } from '@/components/ui';

const LocationHeader = () => {
  const routes = useRouter();

  return (
    <HeaderWrapper className="justify-start bg-white">
      <Button variant="solid" color="transparent" onClick={() => routes.back()}>
        <ChevronLeftIcon />
      </Button>
      <h2 className="text-h4 absolute left-1/2 -translate-x-1/2 font-bold">위치 정보 설정</h2>
    </HeaderWrapper>
  );
};

export default LocationHeader;
