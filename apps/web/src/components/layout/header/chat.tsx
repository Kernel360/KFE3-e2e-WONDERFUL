'use client';

import { useParams, usePathname } from 'next/navigation';

import { Bell } from 'lucide-react';

import HeaderWrapper from '@/components/layout/header/wrapper';

const ChatHeader = () => {
  const pathname = usePathname();
  const { id } = useParams();

  if (pathname.includes('chat') && !id)
    return (
      <HeaderWrapper className="bg-white">
        <h2 className="text-h4 font-bold">채팅</h2>
        <Bell />
      </HeaderWrapper>
    );
};

export default ChatHeader;
