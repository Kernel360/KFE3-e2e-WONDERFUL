'use client';

import HeaderWrapper from '@/components/layout/header/wrapper';
import { Bell } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';

const ChatHeader = () => {
  const pathname = usePathname();
  const params = useParams();
  console.log(params);

  return (
    <HeaderWrapper className="bg-white">
      <h2 className="text-h4 font-bold">채팅</h2>
      <Bell />
    </HeaderWrapper>
  );
};

export default ChatHeader;
