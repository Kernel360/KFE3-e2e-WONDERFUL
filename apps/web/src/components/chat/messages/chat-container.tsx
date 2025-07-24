'use client';

import { useEffect, useRef } from 'react';

import { DateMessage, ReceivedMessage, SentMessage } from '@/components/chat';

import { useChatMessages } from '@/hooks/chat/useChatMessages';

import { useUserStore } from '@/lib/zustand/store/user-store';

const ChatContainer = ({ roomId }: { roomId: string }) => {
  const { messages } = useChatMessages(roomId);
  const currentUserId = useUserStore((state) => state.user?.id);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // TODO: 날짜가 넘어가면 백엔드 측에서 날짜 변경 감지하여 date message 쏘는 거 연결하기

  return (
    <div className="scrollbar-hide-y flex flex-1 flex-col overflow-y-auto px-4">
      {messages.map((msg) => {
        const isMine = msg.type === 'common' && msg.sender_id === currentUserId;

        if (msg.type === 'notice') {
          return <DateMessage key={msg.id} date={msg.content} />;
        }

        return isMine ? (
          <SentMessage key={msg.id} message={msg} />
        ) : (
          <ReceivedMessage key={msg.id} message={msg} />
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatContainer;
