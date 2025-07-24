'use client';

import { useEffect, useRef, useState } from 'react';

import { supabase } from '@/lib/supabase/client';

export const useChatMessages = (roomId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<
    'connecting' | 'connected' | 'disconnected'
  >('connecting');
  const [isLoading, setIsLoading] = useState(true);

  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select(
          `
          *,
          users!sender_id(id, nickname, profile_img)
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
    let mounted = true;

    const init = async () => {
      setConnectionStatus('connecting');
      await loadMessages();

      if (channelRef.current) {
        await supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }

      const channel = supabase.channel(`chat-room-${roomId}`).on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => [...prev, newMessage]);
        }
      );

      try {
        channel.subscribe((status) => {
          console.log('📡 채팅방 구독 상태:', status);
          if (!mounted) return;

          if (status === 'SUBSCRIBED') {
            setConnectionStatus('connected');
          } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
            setConnectionStatus('disconnected');

            setTimeout(() => {
              if (mounted) {
                init();
              }
            }, 1000);
          }
        });

        channelRef.current = channel;
      } catch (err) {
        console.error('채널 구독 에러:', err);
        if (mounted) setConnectionStatus('disconnected');
      }
    };

    init();

    return () => {
      mounted = false;
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [roomId]);

  return { messages, isLoading, connectionStatus };
};
