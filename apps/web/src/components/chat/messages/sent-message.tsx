'use client';

import { useState } from 'react';

import { ChatBubble } from '@/components/chat';

import { formatTo12HourTime } from '@/lib/utils/chat';

const SentMessage = ({ message }: { message: Message }) => {
  // TODO: 실시간 데이터 연동해서 상태값에 따라 bubble 달라질 수 있도록 수정하기
  const [isDone, setIsDone] = useState(false);
  const color = isDone ? 'disabled' : 'primary';

  const type = message.type !== 'notice' ? message.type : 'common';
  const time = formatTo12HourTime(message.sent_at);

  return (
    <div className="flex justify-end gap-2 py-2">
      <p className="flex items-end text-xs font-light text-neutral-500">{time}</p>
      <ChatBubble type={type} color={color} content={message.content} />
    </div>
  );
};

export default SentMessage;
