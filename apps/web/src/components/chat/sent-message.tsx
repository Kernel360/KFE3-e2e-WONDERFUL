'use client';

import { useState } from 'react';

import { ChatBubble } from '@/components/chat';

import { DONE_MESSAGE } from '@/constants/chat';

const SentMessage = () => {
  // TODO: 실시간 데이터 연동해서 상태값에 따라 bubble 달라질 수 있도록 수정하기
  const [isDone, setIsDone] = useState(false);
  const color = isDone ? 'disabled' : 'primary';
  const content = isDone
    ? DONE_MESSAGE
    : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.';

  const time = '12:00 AM';

  return (
    <div className="flex justify-end gap-2 py-2">
      <p className="flex items-end text-xs font-light text-neutral-500">{time}</p>
      <ChatBubble color={color} content={content} />
    </div>
  );
};

export default SentMessage;
