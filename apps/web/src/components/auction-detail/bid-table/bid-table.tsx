'use client';

import { useEffect, useMemo, useState } from 'react';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useQueryClient } from '@tanstack/react-query';

import { BidTableHead, BidTableRow } from '@/components/auction-detail';

import { bidKeys } from '@/hooks/queries/bids/keys';

import { BidListResponse, BidType } from '@/types/bid';

interface BidTableProps {
  auctionId: string;
  initialBids?: BidType[];
}
const BidTable = ({ auctionId, initialBids }: BidTableProps) => {
  const [animationParent] = useAutoAnimate();
  const [hasAnimated, setHasAnimated] = useState(false);

  // 실시간 입찰 데이터 구독
  // const { bids: realtimeBids, isConnected } = useRealtimeBids({
  //   auctionId,
  //   initialBids: initialBids || [],
  // });

  const queryClient = useQueryClient();

  // TanStack Query 캐시에서 실시간 데이터 가져오기
  const bidQueryKey = bidKeys.list(auctionId, 10);
  const cachedBidsData = queryClient.getQueryData<BidListResponse>(bidQueryKey);

  // currentBids를 useMemo로 최적화
  const currentBids = useMemo(() => {
    return cachedBidsData?.data || initialBids || [];
  }, [cachedBidsData?.data, initialBids]);

  // 이제 currentBids는 의존성이 변경될 때만 새로운 값을 가짐
  const sortedBids = useMemo(() => {
    return [...currentBids]
      .sort((a, b) => Number(b.price) - Number(a.price)) // 가격 높은 순
      .slice(0, 5); // 상위 5개만
  }, [currentBids]);

  // 애니메이션 제어용 ref
  // const animationRef = hasAnimated ? null : animationParent;

  useEffect(() => {
    if (currentBids.length > 0 && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [currentBids.length, hasAnimated]);

  // 🔧 낙관적 업데이트 상태 표시 (항상 연결됨)
  // const isConnected = true;
  return (
    <div className="bg-primary-50/60 rounded-sm p-3 [&_p]:flex-1">
      {/* 연결 상태 표시 */}
      {/* <div className="mb-2 flex items-center justify-end">
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-xs text-gray-500">{isConnected ? '실시간 연결' : '연결 끊김'}</span>
        </div>
      </div> */}

      {/* 입찰 목록 */}

      <BidTableHead />

      {currentBids.length < 1 ? (
        <p className="py-8 text-center">아직 입찰 내역이 없습니다.</p>
      ) : (
        <>
          <div className="relative">
            <span className="w-7.5 absolute flex h-full items-center justify-center">
              <i className="bg-primary-100 h-9/10 block w-1"></i>
            </span>
            <ul ref={animationParent} className="space-y-2">
              {sortedBids.map((item) => {
                return <BidTableRow key={item.id} item={item} />;
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default BidTable;
