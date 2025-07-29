'use client';

import { useState } from 'react';

import { X } from 'lucide-react';

import { BidFormBottom, BidFormInput, ButtonDirectDeal } from '@/components/auction-detail';

import useCountdown from '@/hooks/common/useCountdown';
import { useBidMutation } from '@/hooks/mutations/bids';
import { useAuctionDetail } from '@/hooks/queries/auction';

import { cn } from '@/lib/cn';
import { validateBidPrice } from '@/lib/utils/bid-validation';
import { formatCurrencyWithUnit } from '@/lib/utils/price';

import { BidFormProps } from '@/types/bid';

const BidForm = ({
  auctionId,
  currentPrice,
  endTime,
  bidTableRef,
  seller,
  currentUserId,
}: BidFormProps) => {
  const [isBidInputOpen, setIsBidInputOpen] = useState<boolean>(false);
  const [bidPrice, setBidPrice] = useState<number | null>(null);
  const [validationError, setValidationError] = useState<string>('');

  const { data } = useAuctionDetail(auctionId);
  const minBidUnit = data?.data.auctionPrice?.minBidUnit || 1000;

  // 입찰 뮤테이션
  const bidMutation = useBidMutation();

  // 경매 종료 시간까지의 카운트다운
  const { isExpired } = useCountdown(new Date(endTime));
  //const directPrice = formatCurrencyWithUnit(currentPrice * 1.2); // 20% 증가한 가격

  // 본인 경매인지 확인
  const isOwnAuction = currentUserId && data?.data.sellerId === currentUserId;

  // 입찰 가격 변경 시 검증
  const handleBidPriceChange = (price: number | null) => {
    setBidPrice(price);

    // 실시간 검증
    if (price !== null) {
      const validation = validateBidPrice(price, currentPrice, minBidUnit);
      setValidationError(validation.isValid ? '' : validation.message);
    } else {
      setValidationError('');
    }
  };

  const handleBidClick = async (e: React.FormEvent) => {
    e.preventDefault();

    // 경매가 종료된 경우 입찰 불가
    if (isExpired) {
      alert('경매가 종료되어 입찰할 수 없습니다.');
      return;
    }

    if (!isBidInputOpen) {
      setIsBidInputOpen(true);
      return;
    }

    // 본인 경매 입찰 방지
    if (isOwnAuction) {
      alert('본인의 경매에는 입찰할 수 없습니다.');
      return;
    }

    // bidPrice가 null이면 기본값 사용
    const finalBidPrice = bidPrice ?? currentPrice + minBidUnit;

    // 클라이언트 검증
    const validation = validateBidPrice(finalBidPrice, currentPrice, minBidUnit || 1000);
    if (!validation.isValid) {
      setValidationError(validation.message);
      return;
    }

    try {
      // 현재 스크롤 위치 저장
      const currentScrollY = window.scrollY;

      // 입찰 성공 시 상태 초기화
      setValidationError(''); // 검증 에러 메시지 초기화
      setBidPrice(null); // 입찰 가격 초기화
      setIsBidInputOpen(false); // 입찰 성공 시 입찰 입력창 닫기

      // API 호출
      await bidMutation.mutateAsync({
        auctionId,
        bidPrice: finalBidPrice,
      });

      // 성공 시 에러 메시지 초기화
      setValidationError('');
      setBidPrice(null);

      // 스크롤만 처리
      setTimeout(() => {
        window.scrollTo(0, currentScrollY);
        bidTableRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    } catch (error) {
      setIsBidInputOpen(true);
      const errorMessage = error instanceof Error ? error.message : '입찰 중 오류가 발생했습니다.';
      setValidationError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleBidClick}>
      <div className={cn('w-full bg-white transition-all duration-500 ease-in-out')} />
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 bottom-[98%] z-0 h-2/5',
          'from-black/16 bg-gradient-to-t to-transparent',
          'duration-600 transition-all',
          !isBidInputOpen && 'h-6 opacity-30'
        )}
      />

      <div
        className={cn('duration-600 relative z-20 rounded-t-sm bg-white px-5 pt-6 transition-all')}
      >
        {/* 즉시거래 버튼 - 경매가 종료되지 않았고 즉시거래가 활성화된 경우에만 표시 */}
        {!isExpired && data?.data.auctionPrice?.isInstantBuyEnabled && (
          <ButtonDirectDeal
            directPrice={formatCurrencyWithUnit(
              data.data.auctionPrice.instantPrice || currentPrice * 1.2
            )}
            auctionId={auctionId}
            seller={seller}
            currentUserId={currentUserId}
          />
        )}

        <BidFormInput
          auctionId={auctionId}
          currentPrice={currentPrice}
          minUnit={minBidUnit}
          bidPrice={bidPrice}
          isBidInputOpen={isBidInputOpen}
          onChange={handleBidPriceChange}
          validationError={validationError}
        />
      </div>
      <button
        type="button"
        onClick={() => setIsBidInputOpen(false)}
        className={`duration-600 invisible absolute right-2.5 top-0 translate-y-[-100%] p-2 text-white opacity-0 ${isBidInputOpen && 'visible opacity-100'}`}
      >
        <X size={'30'} />
      </button>

      <BidFormBottom
        auctionId={auctionId}
        currentPrice={currentPrice}
        endTime={endTime}
        isExpired={isExpired}
        seller={seller}
        isValid={!validationError && bidPrice !== null}
      />
    </form>
  );
};

export default BidForm;
