'use client';
import { FC } from 'react';

import { MessageSquareMore } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ButtonChatProps {
  onClick?: () => void;
}

const ButtonChat: FC<ButtonChatProps> = ({ onClick }) => {
  return (
    <Button variant="outline" size="sm" onClick={onClick}>
      <MessageSquareMore className="mr-1 h-4 w-4" />
      채팅하기
    </Button>
  );
};

export default ButtonChat;
