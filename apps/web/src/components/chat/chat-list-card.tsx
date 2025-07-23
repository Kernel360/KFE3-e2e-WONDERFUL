'use client';

import Link from 'next/link';

import ButtonChatMore from '@/components/chat/button-chat-more';
import Thumbnail from '@/components/ui/thumbnail';

import { ChatRoom } from '@/types/chat';

const ChatListCard = ({ chatInfo }: { chatInfo: ChatRoom }) => {
  const { auction, otherUser, lastMessageAt, messages } = chatInfo;

  const msgElapsed = () => {
    if (!lastMessageAt) return '';
    const lastTime = new Date(lastMessageAt).getTime();
    const now = Date.now();
    const gapMs = now - lastTime;

    const oneMinute = 60 * 1000;
    const oneHour = 60 * oneMinute;
    const oneDay = 24 * oneHour;
    const oneWeek = 7 * oneDay;
    const oneMonth = 28 * oneDay;
    const oneYear = 365 * oneDay;

    if (gapMs < oneMinute) {
      // 방금
      return '방금';
    } else if (gapMs < oneHour) {
      // n분 전
      const minutes = Math.floor(gapMs / oneMinute);
      return `${minutes}분 전`;
    } else if (gapMs < oneDay) {
      // 1시간 전, n시간 전
      const hours = Math.floor(gapMs / oneHour);
      return `${hours}시간 전`;
    } else if (gapMs < oneWeek) {
      // n일 전
      const days = Math.floor(gapMs / oneDay);
      return `${days}일 전`;
    } else if (gapMs < oneMonth) {
      // n주 전
      const weeks = Math.floor(gapMs / oneWeek);
      return `${weeks}주 전`;
    } else if (gapMs < oneYear) {
      // n달 전
      const months = Math.floor(gapMs / oneMonth);
      return `${months}달 전`;
    } else {
      // n년 전
      const years = Math.floor(gapMs / oneYear);
      return `${years}년 전`;
    }
  };

  // TODO: 기능 연결 시 roomId 로 연결 해서 해당 태그 내에서 작성할 것.
  const roomId = chatInfo.id;
  const link = `/chat/${roomId}`;

  return (
    <div className="flex h-fit w-full items-center justify-between gap-2.5">
      <Link href={link} className="flex w-full shrink items-center gap-2.5 py-1">
        <Thumbnail
          url={auction.thumbnailUrl as string}
          alt={'sample'}
          className="w-15 h-15 shrink-0"
        />
        <div className="flex w-full shrink flex-col">
          <div>
            <p className="flex gap-2">
              <strong>{otherUser.nickname}</strong>
              <span>{msgElapsed()}</span>
            </p>
          </div>
          <p className="line-clamp-1 min-h-6 flex-1">
            {!messages.length ? '' : '마지막 메세지 보여주기'}
          </p>
        </div>
      </Link>
      <ButtonChatMore />
    </div>
  );
};

export default ChatListCard;
