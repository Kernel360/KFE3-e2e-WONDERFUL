'use client';

import { ChatListCard } from '@/components/chat';
import { ChatListCardSkeleton } from '@/components/chat';
import { FilterTab } from '@/components/common';

import { useChatRooms } from '@/hooks/chat/useChatRoom';

import { CHAT_STATUS } from '@/lib/constants/chat';

const Page = () => {
  const { chatRooms, isLoading, error } = useChatRooms();

  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col px-4">
        <FilterTab filterKey={'chatStatus'} items={CHAT_STATUS} />
        <ChatListCardSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-500">채팅방 목록을 불러오는데 실패했습니다</div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col px-4">
      <FilterTab filterKey={'chatStatus'} items={CHAT_STATUS} />
      {!chatRooms.length && (
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">대화 중인 채팅방이 없습니다</div>
        </div>
      )}
      {chatRooms.map((chat) => {
        return <ChatListCard key={chat.id} chatInfo={chat} />;
      })}
    </div>
  );
};

export default Page;
