'use client';

import { useQuery } from '@tanstack/react-query';

import { getChatRooms } from '@/lib/api/chat';

import { ChatRoom, ChatRoomsResponse } from '@/types/chat';

export const CHAT_ROOMS_QUERY_KEY = ['chatRooms'];

// 커스텀 훅 반환 타입
interface UseChatRoomsReturn {
  chatRooms: ChatRoom[];
  total: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useChatRooms = (): UseChatRoomsReturn => {
  const query = useQuery<ChatRoomsResponse, Error>({
    queryKey: CHAT_ROOMS_QUERY_KEY,
    queryFn: getChatRooms,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    refetchOnWindowFocus: false,
  });

  return {
    chatRooms: query.data?.data || [],
    total: query.data?.total || 0,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};
