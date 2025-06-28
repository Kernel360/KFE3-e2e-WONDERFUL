'use client';

import Categories from '@/components/categories/categories';
import AuctionItemList from '@/components/common/auction-item-List';
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
