'use client';

import React from 'react';

import AuctionItemList from '@/components/common/auction-item-List';
import Categories from '@/components/common/categories';

import { CATEGORIES } from '@/lib/constants/tabs';

const TradeListPage = () => {
  console.log(CATEGORIES);

  return (
    <div>
      {/* 상단 헤더 */}
      {/* <div className="absolute left-0 top-0 z-10 w-full">
        <Header title="판매 내역" />
      </div> */}

      <Categories items={CATEGORIES} />
      <AuctionItemList />
    </div>
  );
};

export default TradeListPage;
