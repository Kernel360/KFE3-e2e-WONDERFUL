'use client';

import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';

const ButtonBox = () => {
  const router = useRouter();

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = () => {
    // api 요청 로직
  };

  return (
    <section className="backdrop-blur-xs from-white-0 sticky bottom-0 bg-white/70 px-[15px] pb-9 pt-4">
      {/*<Button size="lg" color="secondary" onClick={handleCancel}>*/}
      {/*  취소하기*/}
      {/*</Button>*/}
      <Button size="lg" onClick={handleSubmit} className="flex w-full">
        제출하기
      </Button>
    </section>
  );
};

export default ButtonBox;
