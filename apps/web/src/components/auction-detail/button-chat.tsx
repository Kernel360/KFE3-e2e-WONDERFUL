'use client';

import { useRouter } from 'next/navigation';

import { MessageSquareMore } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { createChatRoom } from '@/lib/actions/chat';

interface ButtonChatProps {
  auctionId: string;
  sellerId: string;
}

const ButtonChat = ({ auctionId, sellerId }: ButtonChatProps) => {
  const router = useRouter();

  const handleChatClick = async () => {
    try {
      const data = await createChatRoom({ auctionId, sellerId });
      router.push(`/chat/${data.roomId}?auctionId=${data.auctionId}`);
      console.log(data.roomId, data.auctionId);
    } catch {
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
