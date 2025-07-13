'use client';
// Todo : AuctionItemList 내부 코드를 여기서 구현하기, 둘다 use client로 사용되야하는 거라면 합치는 게...
// isLoading : Skeleton, error : 잠시후 다시 시도해주세요 -> 공통 error 컴포넌트 필요함

import CategoriesFilter from '@/components/auction/categories-filter';
import { AuctionItemList } from '@/components/common/auction-card';

const AuctionList = () => {
  return (
    <>
      <CategoriesFilter />
      <AuctionItemList />
    </>
  );
};

export default AuctionList;
