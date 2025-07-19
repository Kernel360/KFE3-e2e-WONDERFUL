'use client';

import { useRouter } from 'next/navigation';

import { ChevronLeftIcon } from 'lucide-react';

import HeaderWrapper from '@/components/layout/header/wrapper';
import { Button } from '@/components/ui';

const AddressHeader = () => {
  const routes = useRouter();

  return (
    <HeaderWrapper className="justify-start bg-white">
      <Button variant="solid" color="transparent" onClick={() => routes.back()}>
        <ChevronLeftIcon />
      </Button>
      <h2 className="text-h4 absolute left-1/2 -translate-x-1/2 font-bold">주소 관리</h2>
    </HeaderWrapper>
  );
};

export default AddressHeader;
