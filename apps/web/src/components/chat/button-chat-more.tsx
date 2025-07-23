'use client';

import { useParams, useRouter } from 'next/navigation';

import { ButtonMore } from '@/components/common';

import { ButtonMoreItem } from '../common/button/more';

const ButtonChatMore = () => {
  const params = useParams();
  const router = useRouter();

  const chatId = params?.id as string;

  const handleDelete = async () => {
    try {
      // 삭제 api 추가
      alert('채팅이 삭제되었습니다!');
    } catch (error) {
      alert('삭제 중 오류 발생!');
      console.error(error);
    }
  };

  const AUCTION_DETAILS: ButtonMoreItem[] = [
    { id: 'delete', title: '삭제하기', onClick: handleDelete },
    // 신고하기 게시판 route로 이동
    { id: 'report', title: '신고하기', onClick: () => router.push(`/`) },
  ];

  return <ButtonMore items={AUCTION_DETAILS} />;
};

export default ButtonChatMore;
