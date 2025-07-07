'use client';

import React from 'react';

import AuctionItemList from '@/components/common/auction-item/card-list';
import Categories from '@/components/common/tab/list-filter';

import { FALLBACK_CATEGORIES } from '@/lib/constants/tabs';

const TradeListPage = () => {
  console.log(FALLBACK_CATEGORIES);

  return (
    <div>
      {/* 상단 헤더 */}
      {/* <div className="absolute left-0 top-0 z-10 w-full">
        <Header title="판매 내역" />
      </div> */}

      <Categories items={FALLBACK_CATEGORIES} />
      <AuctionItemList />
    </div>
  );
};

export default TradeListPage;
