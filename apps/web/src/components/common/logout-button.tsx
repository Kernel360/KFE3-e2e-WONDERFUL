'use client';

import { Button } from '@/components/ui/button';

const handleLogout = () => {
  console.log('로그아웃 버튼 클릭');
};

export const LogoutButton = () => {
  return (
    <section aria-label="사용자 로그아웃" className="bottom-32 left-0 z-10 w-full">
      <div className="mx-auto w-[90%] max-w-[480px]">
        <Button
          type="button"
          variant="solid"
          color="secondary"
          aria-label="로그아웃"
          className="h-11 w-full"
          disabled
          onClick={handleLogout}
        >
          로그아웃
        </Button>
      </div>
    </section>
  );
};
