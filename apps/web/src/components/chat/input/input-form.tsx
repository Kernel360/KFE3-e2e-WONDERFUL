'use client';

import { useState } from 'react';

import { SendHorizontal } from 'lucide-react';

import { Button, Textarea } from '@/components/ui';

import { supabase } from '@/lib/supabase/client';

const InputForm = (roomId: { roomId: string }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const currentUserId = '1234';

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="my-4 flex w-full flex-row gap-2">
      <Textarea
        variant="chat"
        placeholder="메세지를 입력하세요. "
        onKeyDown={handleKeyDown}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        disabled={isSending}
      />
      <Button
        variant="solid"
        size="sm"
        className="w-10 rounded-full p-1"
        onClick={sendMessage}
        disabled={!newMessage.trim() || isSending}
      >
        <SendHorizontal strokeWidth={2} size={28} />
      </Button>
    </div>
  );
};

export default InputForm;
