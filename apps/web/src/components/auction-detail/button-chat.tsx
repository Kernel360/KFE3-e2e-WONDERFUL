'use client';

import { error } from 'console';

import { useRouter } from 'next/navigation';

import { MessageSquareMore } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { createChatRoom } from '@/lib/actions/chat';

interface ButtonChatProps {
  auctionId: string;
  seller: { id: string; nickName: string };
}

const ButtonChat = ({ auctionId, seller }: ButtonChatProps) => {
  const router = useRouter();

  const handleChatClick = async () => {
    try {
      const data = await createChatRoom({ auctionId, seller });

      if (!data) {
        throw new Error(`채팅방 정보가 없음`);
      }
      router.push(
        `/chat/${data.roomId}?auctionId=${data.auctionId}&interlocutor=${seller.nickName}`
      );
    } catch (error) {
      console.error(error);
      alert('잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <Button variant="outline" onClick={handleChatClick}>
      <MessageSquareMore />
      채팅하기
    </Button>
  );
};

export default ButtonChat;
