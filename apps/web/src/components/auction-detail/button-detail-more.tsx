'use client';

import ButtonMore, { ButtonMoreItem } from '@/components/common/button/more';
import { deleteAuction } from '@/lib/actions/auction.action';
import { useParams, useRouter } from 'next/navigation';

const ButtonDetailMore = () => {
  const params = useParams();
  const router = useRouter();

  const itemId = params?.id as string;

  const handleDelete = async () => {
    try {
      await deleteAuction(itemId);
      alert('삭제되었습니다!');
      router.push(`/`); // 홈 또는 리스트로 이동
    } catch (error) {
      alert('삭제 중 오류 발생!');
      console.error(error);
    }
  };

  const AUCTION_DETAILS: ButtonMoreItem[] = [
    { id: 'update', title: '수정하기', onClick: () => router.push(`/auction/${itemId}/edit`) },
    { id: 'delete', title: '삭제하기', onClick: handleDelete },
  ];
  return <ButtonMore items={AUCTION_DETAILS} />;
};

export default ButtonDetailMore;
