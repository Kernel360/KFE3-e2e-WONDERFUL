'use client';

import { useEffect, useRef, useState } from 'react';

import type { RealtimeChannel } from '@supabase/supabase-js';

import { supabase } from '@/lib/supabase/client';
import type { ChatMessage } from '@/lib/types/chat';

interface ChatRoomProps {
  roomId: string;
  currentUserId: string; // 임시로 prop으로 받음 (나중에 Auth에서 가져올 예정)
  auctionTitle?: string;
}

const TestChatRoom = ({ roomId, currentUserId, auctionTitle }: ChatRoomProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    'connecting' | 'connected' | 'disconnected'
  >('connecting');

  const channelRef = useRef<RealtimeChannel | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 메시지 스크롤을 맨 아래로
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 기존 메시지 로드
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

  // 실시간 메시지 구독 설정
  useEffect(() => {
    // 기존 메시지 로드
    loadMessages();

    // Realtime 채널 생성 및 구독
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

          // 새 메시지를 상태에 추가 (sender 정보는 별도로 fetch 필요)
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

    // Cleanup
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [roomId]);

  // 새 메시지가 추가될 때마다 스크롤
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 메시지 전송
  const sendMessage = async () => {
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    try {
      const { error } = await supabase.from('chat_messages').insert({
        room_id: roomId,
        sender_id: currentUserId,
        content: newMessage.trim(),
        sent_at: new Date().toISOString(),
      });

      if (error) {
        console.error('메시지 전송 에러:', error);
        alert('메시지 전송에 실패했습니다.');
        return;
      }

      setNewMessage('');
    } catch (error) {
      console.error('메시지 전송 실패:', error);
      alert('메시지 전송에 실패했습니다.');
    } finally {
      setIsSending(false);
    }
  };

  // 엔터키로 메시지 전송
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // 연결 상태 스타일
  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-green-600';
      case 'disconnected':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return '🟢 연결됨';
      case 'disconnected':
        return '🔴 연결 끊어짐';
      default:
        return '🟡 연결 중...';
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-gray-500">채팅방을 로드하는 중...</div>
      </div>
    );
  }

  return (
    <div className="flex h-96 flex-col overflow-hidden rounded-lg border border-gray-300 bg-white">
      {/* 헤더 */}
      <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-3">
        <div>
          <h3 className="font-semibold text-gray-800">
            {auctionTitle ? `${auctionTitle} - 문의` : '채팅방'}
          </h3>
          <p className="text-xs text-gray-500">Room ID: {roomId}</p>
        </div>
        <div className={`text-xs ${getStatusColor()}`}>{getStatusText()}</div>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="text-center text-sm text-gray-500">
            아직 메시지가 없습니다. 첫 메시지를 보내보세요!
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender_id === currentUserId ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs rounded-lg px-3 py-2 lg:max-w-md ${
                  message.sender_id === currentUserId
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {/* 발송자 이름 (상대방 메시지에만 표시) */}
                {message.sender_id !== currentUserId && (
                  <div className="mb-1 text-xs text-gray-600">
                    {message.sender?.nickname || 'Unknown'}
                  </div>
                )}

                {/* 메시지 내용 */}
                <div className="text-sm">{message.content}</div>

                {/* 시간 */}
                <div
                  className={`mt-1 text-xs ${
                    message.sender_id === currentUserId ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {new Date(message.sent_at).toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 메시지 입력 영역 */}
      <div className="border-t bg-gray-50 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하세요..."
            disabled={connectionStatus !== 'connected' || isSending}
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim() || connectionStatus !== 'connected' || isSending}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {isSending ? '전송 중...' : '전송'}
          </button>
        </div>

        {/* 입력 도움말 */}
        <div className="mt-2 text-xs text-gray-500">Enter: 전송, Shift+Enter: 줄바꿈</div>
      </div>
    </div>
  );
};

export default TestChatRoom;
