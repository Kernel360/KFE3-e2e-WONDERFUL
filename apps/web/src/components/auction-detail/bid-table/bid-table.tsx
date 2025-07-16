import React from 'react';

import { BidTableHead, BidTableRow } from '@/components/auction-detail';

import { BIDDING_DUMMY } from '@/constants/bid-list';

const BidTable = () => {
  const BIDS = BIDDING_DUMMY.bids.slice(0, 5);

  return (
    <div className="bg-primary-50/60 space-y-2 rounded-sm p-3 [&_p]:flex-1">
      <BidTableHead />
      <div className="relative">
        <span className="w-7.5 absolute flex h-full items-center justify-center">
          <i className="bg-primary-100 h-9/10 block w-1"></i>
        </span>
        <ul className="space-y-2">
          {BIDS.map((item) => {
            return <BidTableRow key={item.bid_id} item={item} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default BidTable;
