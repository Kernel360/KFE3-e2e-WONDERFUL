import { useState } from 'react';

import { tv } from 'tailwind-variants';

import BannerDirect from '@/components/auction-detail/banner-direct';
import BidInput from '@/components/auction-detail/bid-input';
import ButtonFavorite from '@/components/auction-detail/button-favorite';
import { Button } from '@/components/ui/button';

import useCountdown from '@/hooks/common/useCountdown';

import { formatCurrencyWithUnit } from '@/lib/utils/price';

const bidInputWrapper = tv({
  base: 'transition-all duration-700 overflow-hidden',
  variants: {
    open: {
      true: 'pt-2 max-h-[300px] translate-y-0',
      false: 'max-h-0 translate-y-4 pointer-events-none',
    },
  },
});
interface BidFormProps {
  currentPrice: number;
  endTime: string | Date; // 경매 종료 시간
  auctionId: string; // 경매 ID
}
const BidForm = ({ currentPrice, endTime, auctionId }: BidFormProps) => {
  const [isBidding, setIsBidding] = useState(false);
  const [bidPrice, setBidPrice] = useState<number | null>(null);

  // 경매 종료 시간까지의 카운트다운
  const { hours, minutes, isExpired } = useCountdown(new Date(endTime));

  const directPrice = formatCurrencyWithUnit(currentPrice * 1.2); // 20% 증가한 가격
  // 현재 입찰가를 포맷팅
  const formattedCurrentPrice = formatCurrencyWithUnit(currentPrice);

  const handleBidClick = () => {
    // 경매가 종료된 경우 입찰 불가
    if (isExpired) {
      alert('경매가 종료되어 입찰할 수 없습니다.');
      return;
    }
    if (!isBidding) return setIsBidding((prev) => !prev);

    if (bidPrice === null) return alert('입찰 금액을 입력해주세요');

    // 여기에 실제 입찰 로직 추가
    console.log('입찰 처리:', bidPrice);
  };

  // 버튼 텍스트 결정
  const getButtonText = () => {
    if (isExpired) return '입찰종료';
    return '입찰하기';
  };

  // 버튼 색상 결정
  const getButtonColor = () => {
    if (isExpired) return 'secondary';
    return 'primary';
  };

  return (
    <div className="duration-600 flex w-full flex-col gap-2 bg-white p-4 shadow-[0_-4px_8px_-2px_rgba(0,0,0,0.05)] transition-all">
      <div className="flex w-full justify-center">
        <div className="h-1 w-1/3 rounded-full bg-neutral-200" />
      </div>
      <div className={`duration-600 transition-all ${isBidding ? 'pb-4' : 'pb-0'}`}>
        {/* 경매가 종료되지 않은 경우에만 즉시구매 배너 표시 */}
        {!isExpired && <BannerDirect directPrice={directPrice} />}

        {/* 경매 종료 상태 메시지 */}
        {isExpired && (
          <div className="mb-2 rounded-lg bg-neutral-100 p-3 text-center">
            <span className="text-sm font-medium text-neutral-600">경매가 종료되었습니다</span>
          </div>
        )}
        {/* 입찰 입력창 */}
        <div className={bidInputWrapper({ open: isBidding && !isExpired })}>
          <BidInput
            currentPrice={currentPrice}
            minUnit={1000}
            bidPrice={bidPrice}
            onChange={setBidPrice}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ButtonFavorite auctionId={auctionId} />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-neutral-600">
              {isExpired ? '최종 낙찰가' : '현재 입찰가'}
            </span>
            <span className="text-xl font-bold text-indigo-500">{formattedCurrentPrice}</span>
          </div>
        </div>

        <Button
          size="medium"
          color={getButtonColor()}
          onClick={handleBidClick}
          disabled={isExpired} // 경매 종료시 비활성화
          className={isExpired ? 'cursor-not-allowed opacity-50' : ''}
        >
          {getButtonText()}
        </Button>
      </div>
    </div>
  );
};

export default BidForm;
