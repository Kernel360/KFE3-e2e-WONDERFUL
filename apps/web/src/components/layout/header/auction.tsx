'use client';

import HeaderWrapper from '@/components/layout/header/wrapper';
import { ChevronLeft, ChevronLeftIcon, MoveLeft } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import ButtonDetailMore from '../../auction-detail/button-detail-more';

const AuctionHeader = () => {
  const routes = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { id } = params;

  return (
    <HeaderWrapper
      className={`${id && !pathname.includes('edit') ? 'absolute z-10 text-white' : 'bg-white'}`}
    >
      <button type="button" onClick={() => routes.back()}>
        <ChevronLeftIcon />
      </button>
      {(pathname.includes('edit') || pathname.includes('create')) && (
        <h2 className="text-h4 absolute left-1/2 -translate-x-1/2 font-bold">
          {pathname.includes('edit') ? '경매 상품 수정' : '경매 상품 등록'}
        </h2>
      )}

      {id && !pathname.includes('edit') && <ButtonDetailMore />}
    </HeaderWrapper>
  );
};

export default AuctionHeader;
