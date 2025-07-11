import { SendHorizontal } from 'lucide-react';

import { Button, Textarea } from '@/components/ui';

const ChatInput = () => {
  return (
    <div className="my-4 flex flex-row gap-2">
      <Textarea variant="chat" placeholder="메세지를 입력하세요. " />
      <Button variant="solid" size="sm" className="w-10 rounded-full p-1">
        <SendHorizontal strokeWidth={2} size={28} />
      </Button>
    </div>
  );
};

export default ChatInput;
