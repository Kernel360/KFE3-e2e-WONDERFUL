'use client';

import { useState } from 'react';

import { ChatBubble } from '@/components/chat';
import { ProfileImage } from '@/components/common';

import { DONE_MESSAGE } from '@/constants/chat';
import { dummyUrls } from '@/constants/dummy-urls';

const ReceivedMessage = () => {
  // TODO: 실시간 데이터 연동해서 상태값에 따라 bubble 달라질 수 있도록 수정하기
  const [isDone, setIsDone] = useState(false);
  const color = isDone ? 'disabled' : 'secondary';
  const content = isDone
    ? DONE_MESSAGE
    : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.';

  const url = dummyUrls[0]!;

  return (
    <div className="flex justify-start gap-2 py-2">
      <ProfileImage src={url} alt="content" className="size-10" />
      <ChatBubble color={color} content={content} />
      <p className="flex items-end text-xs font-light text-neutral-500">12:00 AM</p>
    </div>
  );
};

export default ReceivedMessage;
