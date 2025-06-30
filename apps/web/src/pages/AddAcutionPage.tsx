'use client';

import { CircleAlert } from 'lucide-react';
import AddAcutionForm from '@/components/add-auction/add-auction-form';
import Notice from '../components/common/notice';
import { Button } from '../components/ui';

const AddAuctionPage = () => {
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 기본 제출 동작 방지

    const form = event.currentTarget;
    const formData = new FormData(form);

    console.log(formData);
  };

  return (
    <form onSubmit={submitHandler} className="relative mt-2.5">
      <section className="px-[15px]">
        <AddAcutionForm />
        <Notice status="caution" className="mt-11">
          <li>
            <CircleAlert />
            경매를 등록하시면 등록 즉시 시작됩니다.
          </li>
        </Notice>
      </section>

      <section className="backdrop-blur-xs from-white-0 sticky bottom-0 bg-white/70 px-[15px] pb-9 pt-4">
        {/* 모바일 home indicator 계산 배포 환경에서 확인 필요: pb-[env(safe-area-inset-bottom)] */}
        <Button className="w-full" size={'lg'}>
          등록하기
        </Button>
      </section>
    </form>
  );
};

export default AddAuctionPage;
