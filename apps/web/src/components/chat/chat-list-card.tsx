'use client';

import Link from 'next/link';

import { EllipsisVertical } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Thumbnail from '@/components/ui/thumbnail';

import { PREVIEWCHATS } from '@/lib/constants/chat';
import { dummyUrls } from '@/lib/constants/dummy-urls';

import { ChatRoom } from '@/types/chat';

const ChatListCard = ({ chatInfo }: { chatInfo: ChatRoom }) => {
  const lastMessageTime = PREVIEWCHATS[9]!.last_message_at;
  console.log(chatInfo);

  const { auction, otherUser, lastMessageAt, messages } = chatInfo;

  const msgElapsed = () => {
    const lastTime = new Date(lastMessageTime).getTime();
    const now = Date.now();
    const gapMs = now - lastTime;

    const oneMinute = 60 * 1000;
    const oneHour = 60 * oneMinute;
    const oneDay = 24 * oneHour;
    const oneWeek = 7 * oneDay;
    const twoWeek = 14 * oneDay;
    const threeWeek = 21 * oneDay;
    const oneMonth = 28 * oneDay;

    if (gapMs < oneHour) {
      // 방금
      // n분 전
      const minutes = Math.floor(gapMs / oneMinute);
      return `${minutes}min`;
    } else if (gapMs < oneDay) {
      //1시간 전
      const hours = Math.floor(gapMs / oneHour);
      return `${hours}${hours === 1 ? 'hour' : 'hours'}`;
    } else if (gapMs < oneWeek) {
      //n일 전
      const days = Math.floor(gapMs / oneDay);
      return `${days}${days === 1 ? 'day' : 'days'}`;
    } else {
      // n달 전
      // n년 전
      return '일주일 초과';
    }
  };

  // const test = msgElapsed();

  // TODO: 기능 연결 시 roomId 로 연결 해서 해당 태그 내에서 작성할 것.
  const roomId = '123';
  const link = `/chat/${roomId}`;

  return (
    <div className="flex h-fit w-full items-center justify-between gap-2.5">
      <Link href={link} className="flex w-full shrink items-center gap-2.5 py-1">
        <Thumbnail url={dummyUrls[0]!} alt={'sample'} className="w-15 h-15 shrink-0" />
        <div className="flex w-full shrink flex-col">
          <div className="">
            <p className="flex gap-2">
              <strong>{PREVIEWCHATS[0]!.opponent_nickname}</strong>
              <span>{PREVIEWCHATS[0]!.last_message_at}</span>
            </p>
          </div>
          <p className="">{PREVIEWCHATS[0]!.last_message}</p>
        </div>
      </Link>
      <Button color="transparent" className="h-10 w-10">
        <EllipsisVertical />
      </Button>
    </div>
  );
};

export default ChatListCard;
