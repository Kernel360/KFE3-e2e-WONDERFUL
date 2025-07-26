'use client';

import { useRouter } from 'next/navigation';

import { ChevronLeftIcon } from 'lucide-react';

import { HeaderWrapper } from '@/components/layout';
import { Button } from '@/components/ui';

const SupportHeader = () => {
  const router = useRouter();

  return (
    <HeaderWrapper className="justify-start bg-white">
      <Button variant="solid" color="transparent" onClick={() => router.back()}>
        <ChevronLeftIcon />
      </Button>
      <h2 className="text-h4 absolute left-1/2 -translate-x-1/2 font-bold">고객 센터</h2>
    </HeaderWrapper>
  );
};

export default SupportHeader;
