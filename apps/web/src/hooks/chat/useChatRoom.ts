'use client';

import { useEffect } from 'react';

import { useQuery, useQueryClient, type QueryObserverResult } from '@tanstack/react-query';

import { getChatRooms } from '@/lib/api/chat';
import { createClient } from '@/lib/supabase/client';

import { ChatRoom, ChatRoomsResponse } from '@/types/chat';

export const CHAT_ROOMS_QUERY_KEY = ['chatRooms'];

// 커스텀 훅 반환 타입
interface UseChatRoomsReturn {
  chatRooms: ChatRoom[];
  total: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<QueryObserverResult<ChatRoomsResponse, Error>>;
}

export const useChatRooms = (): UseChatRoomsReturn => {
  const queryClient = useQueryClient();

  const query = useQuery<ChatRoomsResponse, Error>({
    queryKey: CHAT_ROOMS_QUERY_KEY,
    queryFn: getChatRooms,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    refetchOnWindowFocus: false,
  });
  // 실시간 구독 설정
  useEffect(() => {
    const supabase = createClient();

    // 채팅방 메타 정보 구독 채널 (동료 추천 방식)
    const chatMetaChannel = supabase
      .channel('chat-meta')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_messages',
        },
        () => {
          // 채팅방 목록 캐시 무효화 → 자동 리패치
          queryClient.invalidateQueries({
            queryKey: CHAT_ROOMS_QUERY_KEY,
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_rooms',
        },
        () => {
          // 채팅방 목록 리패치
          queryClient.invalidateQueries({
            queryKey: CHAT_ROOMS_QUERY_KEY,
          });
        }
      )
      .subscribe(() => {});

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      supabase.removeChannel(chatMetaChannel);
    };
  }, [queryClient]);

  return {
    chatRooms: query.data?.data || [],
    total: query.data?.total || 0,
    isLoading: query.isLoading,
    error: query.error,
    refetch: () => query.refetch(),
  };
};
