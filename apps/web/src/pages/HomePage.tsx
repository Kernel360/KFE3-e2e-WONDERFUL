'use client';

import AuctionItemList from '@/components/common/auction-item-List';
import Categories from '@/components/common/categories';

import { CATEGORIES } from '../lib/constants/tabs';

const HomePage = () => {
  return (
    <section>
      <Categories items={CATEGORIES} />
      <AuctionItemList />
    </section>
  );
};

export default HomePage;
