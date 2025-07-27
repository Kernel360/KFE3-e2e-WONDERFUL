'use client';

import { useParams, usePathname, useSearchParams } from 'next/navigation';

import { Bell } from 'lucide-react';

import { BackButton, ButtonMore } from '@/components/common';
import { HeaderWrapper } from '@/components/layout';
const ChatHeader = () => {
  const pathname = usePathname();
  const { id } = useParams();

  // TODO: chatRoome 데이터에 대한 전역처리 후 title 부분 수정
  const searchParams = useSearchParams();
  const interlocutor = searchParams.get('interlocutor');

  const item = [
    {
      id: 'report',
      title: '신고하기',
      onClick: () => {},
    },
  ];

  return (
    <HeaderWrapper className="bg-white">
      {pathname.includes('chat') && !id ? (
        <>
          <h2 className="text-h4 font-bold">채팅</h2>
          <Bell />
        </>
      ) : (
        <>
          <BackButton />
          <h2 className="text-h4 font-bold">{interlocutor}</h2>
          <ButtonMore items={item} />
        </>
      )}
    </HeaderWrapper>
  );
};

export default ChatHeader;
