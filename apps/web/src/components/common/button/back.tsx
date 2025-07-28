'use client';

import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { ChevronLeftIcon } from 'lucide-react';

import { CHAT_ROOMS_QUERY_KEY } from '@/hooks/chat/useChatRoom';

const BackButton = () => {
  const routes = useRouter();
  const queryClient = useQueryClient();

  const handleBack = () => {
    // 채팅방 목록 새로고침
    queryClient.invalidateQueries({
      queryKey: CHAT_ROOMS_QUERY_KEY,
    });
    routes.push('/chat');
  };
  return (
    <button type="button" onClick={handleBack} aria-label="Go back">
      <ChevronLeftIcon />
    </button>
  );
};

export default BackButton;
