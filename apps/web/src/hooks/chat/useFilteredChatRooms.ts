'use client';

import { useMemo } from 'react';

import { useChatRooms } from '@/hooks/chat/useChatRoom';

import { useFilterStore } from '@/lib/zustand/store';

export default function useFilteredChatRooms() {
  const { chatRooms, isLoading, error } = useChatRooms();
  const chatStatus = useFilterStore((s) => s.selectedItems.chatStatus);

  const filtered = useMemo(() => {
    if (!chatRooms) return [];
    if (chatStatus === 'sales') {
      return chatRooms.filter((r) => r.myRole === 'seller');
    }
    if (chatStatus === 'purchases') {
      return chatRooms.filter((r) => r.myRole === 'buyer');
    }
    return chatRooms;
  }, [chatRooms, chatStatus]);

  return { filtered, isLoading, error };
}
