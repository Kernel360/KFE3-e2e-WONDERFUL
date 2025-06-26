'use client';

import Categories from '@/components/categories/categories';
import AuctionItemList from '@/components/common/auction-item-List';

const HomePage = () => {
  return (
    <section>
      <Categories />
      <AuctionItemList />
    </section>
  );
};

export default HomePage;
