'use client';

import { usePathname, useRouter } from 'next/navigation';

import { ChevronLeftIcon } from 'lucide-react';

import HeaderWrapper from '@/components/layout/header/wrapper';
import { Button } from '@/components/ui';

const AccountHeader = () => {
  const routes = useRouter();
  const pathname = usePathname();
  const title = pathname.includes('/create')
    ? '계좌 등록'
    : pathname.includes('/edit')
      ? '계좌 수정'
      : '계좌 관리';

  return (
    <HeaderWrapper className="justify-start bg-white">
      <Button variant="solid" color="transparent" onClick={() => routes.back()}>
        <ChevronLeftIcon />
      </Button>
      <h2 className="text-h4 absolute left-1/2 -translate-x-1/2 font-bold">{title}</h2>
    </HeaderWrapper>
  );
};

export default AccountHeader;
