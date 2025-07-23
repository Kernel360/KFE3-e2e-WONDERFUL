'use client';

import { useEffect, useRef, useState } from 'react';

import type { RealtimeChannel } from '@supabase/supabase-js';

import { DateMessage, ReceivedMessage, SentMessage } from '@/components/chat';

import { supabase } from '@/lib/supabase/client';

import type { ChatMessage } from '@/types/chat';

const ChatContainer = (roomId: { roomId: string }) => {
  const date = '2025년 9월 20일';
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<
    'connecting' | 'connected' | 'disconnected'
  >('connecting');
  const channelRef = useRef<RealtimeChannel | null>(null);

  // TODO: 기능 연결 시 user Id 체크 후 알맞은 컴포넌트 return 하는 로직 추가
  // - 날짜가 넘어가면 백엔드 측에서 날짜 변경 감지하여 date message 쏴주기

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select(
          `
          *,
          sender:users(id, nickname, profile_img)
        `
        )
        .eq('room_id', roomId)
        .order('sent_at', { ascending: true });

      if (error) {
        console.error('메시지 로드 에러:', error);
        return;
      }

      setMessages(data || []);
    } catch (error) {
      console.error('메시지 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();

    const channel = supabase
      .channel(`chat-room-${roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          console.log('🆕 새 메시지 수신:', payload);
          const newMessage = payload.new as ChatMessage;

          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe((status) => {
        console.log('📡 채팅방 구독 상태:', status);
        if (status === 'SUBSCRIBED') {
          setConnectionStatus('connected');
        } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          setConnectionStatus('disconnected');
        }
      });

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [roomId]);

  return (
    <div className="flex h-auto flex-col overflow-y-auto px-4">
      <DateMessage date={date} />
      <ReceivedMessage />
      <SentMessage />
    </div>
  );
};

export default ChatContainer;
