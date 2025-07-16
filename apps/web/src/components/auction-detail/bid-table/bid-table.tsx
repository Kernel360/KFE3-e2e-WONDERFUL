'use client';

import { useMemo } from 'react';

import { useAutoAnimate } from '@formkit/auto-animate/react';

import { BidTableHead, BidTableRow } from '@/components/auction-detail';

import { BidType } from '@/types/bid';

import { BIDDING_DUMMY } from '@/constants/bid-list';

const BidTable = () => {
  const [animationParent] = useAutoAnimate();

  const BIDS = BIDDING_DUMMY.bids;

  const sortBid: BidType[] = useMemo(() => {
    return [...BIDS].sort((a, b) => Number(b.price) - Number(a.price)).slice(0, 5);
  }, [BIDS]);

  return (
    <div className="bg-primary-50/60 rounded-sm p-3 [&_p]:flex-1">
      {BIDS.length < 1 ? (
        <p className="py-8 text-center">아직 입찰 내역이 없습니다.</p>
      ) : (
        <>
          <BidTableHead />
          <div className="relative">
            <span className="w-7.5 absolute flex h-full items-center justify-center">
              <i className="bg-primary-100 h-9/10 block w-1"></i>
            </span>
            <ul ref={animationParent} className="space-y-2">
              {sortBid.map((item) => {
                return <BidTableRow key={item.bid_id} item={item} />;
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default BidTable;
