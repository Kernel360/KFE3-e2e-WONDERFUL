'use client';

import Categories from '@/components/categories/categories';
import AuctionItemList from '@/components/common/auction-item-List';

// import { useUsers } from '../hooks/api/users/useUsers';

const HomePage = () => {
  return (
    <section>
      <Categories />
      <AuctionItemList />
      {/* <h1 className="text-2xl font-bold">메인 홈 페이지</h1>
      <p>vercel test3</p> */}
      {/* <p className="text-lg">{data?.message}</p> */}
      {/* <p>{data ? `연결 성공! 사용자 수: ${data.userCount}명` : '연결 실패'}</p> */}
    </section>
  );
};

export default HomePage;
