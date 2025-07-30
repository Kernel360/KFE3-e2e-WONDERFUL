'use client';

import { useRouter } from 'next/navigation';

import { MessageSquareMore } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { createChatRoom } from '@/lib/actions/chat';
import { useToastStore } from '@/lib/zustand/store';

import { Seller } from '@/types/chat';

interface ButtonChatProps {
  auctionId: string;
  seller: Seller;
}

const ButtonChat = ({ auctionId, seller }: ButtonChatProps) => {
  const router = useRouter();

  const { showToast } = useToastStore();

  const handleChatClick = async () => {
    const results = await createChatRoom({ auctionId, seller });
    const { data } = results;

    if (!results.success) {
      showToast({
        status: 'error',
        title: '채팅방 생성에 실패했습니다.',
        autoClose: true,
      });
    }

    router.push(
      `/chat/${data?.roomId}?auctionId=${data?.auctionId}&interlocutor=${seller.nickname}`
    );
  };

  return (
    <Button variant="outline" onClick={handleChatClick}>
      <MessageSquareMore />
      채팅하기
    </Button>
  );
};

export default ButtonChat;
