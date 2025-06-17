'use client';

import { TestLucide } from '~shared/ui/components/test-lucide';

export const HomePage = () => {
  return (
    <main className="p-8">
      <h1 className="mb-4 text-2xl font-bold">프론트엔드 설정 테스트</h1>
      <TestLucide />
    </main>
  );
};
