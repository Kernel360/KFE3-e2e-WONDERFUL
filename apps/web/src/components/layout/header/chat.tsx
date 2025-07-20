'use client';

import { useParams, usePathname } from 'next/navigation';

import { Bell } from 'lucide-react';

import { BackButton, ButtonMore } from '@/components/common';
import { HeaderWrapper } from '@/components/layout';

const ChatHeader = () => {
  const pathname = usePathname();

  // TODO: chat-room id 로 chat-room info 에 대한 정보 받아 온 후 title 부분 설정 -> 상대방 닉네임
  const { id } = useParams();

  // TODO: 채팅방 더보기 버튼에서 제공하는 버튼 결정 후 기능 연결 시 수정
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
          <h2 className="text-h4 font-bold">상대방 닉네임</h2>
          <ButtonMore items={item} />
        </>
      )}
    </HeaderWrapper>
  );
};

export default ChatHeader;
