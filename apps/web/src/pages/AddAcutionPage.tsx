'use client';

import { CircleAlert } from 'lucide-react';
import AddAcutionForm from '../components/add-auction/add-auction-form';
import Notice from '../components/common/notice';
import { Button } from '../components/ui';

function AddAuctionPage() {
  return (
    <form action={''} className="px-[15px]">
      <AddAcutionForm />

      <Notice status="caution">
        <li>
          <CircleAlert />
          첫번째 내용
        </li>
      </Notice>

      <Button className="w-full" size={'lg'}>
        등록하기
      </Button>
    </form>
  );
}

export default AddAuctionPage;
