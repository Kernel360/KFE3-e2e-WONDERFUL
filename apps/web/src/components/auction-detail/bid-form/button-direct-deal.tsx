import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { AlarmClock, ChevronRight } from 'lucide-react';

import { createChatRoom } from '@/lib/actions/chat';

import { Seller } from '@/types/chat';

interface ButtonDirectDealProps {
  directPrice: string;
  auctionId: string;
  seller: Seller;
  currentUserId?: string;
}

const ButtonDirectDeal = ({
  directPrice,
  auctionId,
  seller,
  currentUserId,
}: ButtonDirectDealProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 본인 경매인지 확인
  const isOwnAuction = currentUserId === seller.id;

  const handleDirectDeal = async () => {
    // 본인 경매인 경우 안내 메시지
    if (isOwnAuction) {
      alert(
        '본인의 경매 상품은 즉시거래를 할 수 없습니다.\n다른 사용자가 즉시거래를 진행할 수 있습니다.'
      );
      return;
    }

    try {
      setIsLoading(true);

      // 즉시거래 확인 알림
      const confirmed = window.confirm(
        `${directPrice}에 즉시 구매하시겠습니까?\n구매 확정 시 채팅방으로 이동합니다.`
      );

      if (!confirmed) return;

      // 채팅방 생성
      const chatRoomId = await createChatRoom({
        auctionId,
        seller: { id: seller.id, nickname: seller.nickname },
      });

      // 채팅방으로 이동
      router.push(`/chat/${chatRoomId}`);
    } catch (error) {
      console.error('즉시거래 처리 중 오류:', error);
      alert('즉시거래 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      className={`bg-primary-50 mb-1 flex w-full items-center justify-between gap-2 rounded-sm py-2.5 pl-4 pr-2`}
      onClick={handleDirectDeal}
      disabled={isLoading}
    >
      <AlarmClock className="text-indigo-500" strokeWidth={2.5} size={20} />
      <p className="flex-1 pt-0.5 text-left font-medium text-neutral-900">
        지금
        <span className="font-semibold text-indigo-500">{' ' + directPrice}</span>에 즉시구매 하기
      </p>
      <ChevronRight className="size-6 text-neutral-600" />
    </button>
  );
};

export default ButtonDirectDeal;
