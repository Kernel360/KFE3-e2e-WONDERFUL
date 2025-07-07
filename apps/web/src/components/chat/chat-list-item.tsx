import React from 'react';

import Link from 'next/link';

import { EllipsisVertical } from 'lucide-react';

import Thumbnail from '@/components/ui/thumbnail';
import { Button } from '@/components/ui/button';

import { PREVIEWCHATS } from '@/lib/constants/chat';
import { dummyUrls } from '@/lib/constants/dummy-urls';

const ChatListItem = () => {
  const lastMessageTime = PREVIEWCHATS[9]!.last_message_at;

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
      const minutes = Math.floor(gapMs / oneMinute);
      return `${minutes}min`;
    } else if (gapMs < oneDay) {
      const hours = Math.floor(gapMs / oneHour);
      return `${hours}${hours === 1 ? 'hour' : 'hours'}`;
    } else if (gapMs < oneWeek) {
      const days = Math.floor(gapMs / oneDay);
      return `${days}${days === 1 ? 'day' : 'days'}`;
    } else {
      return '일주일 초과';
    }
  };

  const test = msgElapsed();

  console.log(test);

  return (
    <div className="flex h-fit w-full items-center justify-between gap-2.5">
      <Link href={'/'} className="flex w-full shrink items-center gap-2.5 py-1">
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

export default ChatListItem;
