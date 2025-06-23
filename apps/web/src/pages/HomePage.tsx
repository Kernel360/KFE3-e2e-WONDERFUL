'use client';

import { PenLine } from 'lucide-react';

import { FloatButton } from '../components/ui/float-button';

{
  /* <h1>메인 홈 페이지</h1> */
}
const HomePage = () => {
  return (
    <div className="flex flex-col">
      <h3>Solid Primary</h3>
      <div className="mb-6 flex items-center gap-3">
        <FloatButton title="플로팅버튼" size={'min'}>
          <PenLine />
        </FloatButton>
        <FloatButton title="플로팅버튼" size={'sm'}>
          <PenLine />
        </FloatButton>
        <FloatButton title="플로팅버튼">
          <PenLine />
        </FloatButton>
        <FloatButton title="플로팅버튼" size={'lg'}>
          <PenLine />
        </FloatButton>
      </div>

      <h3>Solid Primary</h3>
      <div className="mb-6 flex items-center gap-3">
        <FloatButton title="플로팅버튼" size={'min'} color="secondary">
          <PenLine />
        </FloatButton>
        <FloatButton title="플로팅버튼" size={'sm'} color="secondary">
          <PenLine />
        </FloatButton>
        <FloatButton title="플로팅버튼" color="secondary">
          <PenLine />
        </FloatButton>
        <FloatButton title="플로팅버튼" size={'lg'} color="secondary">
          <PenLine />
        </FloatButton>
      </div>

      <h3>Transparent Primary</h3>
      <div className="mb-6 flex items-center gap-3">
        <FloatButton title="플로팅버튼" size={'min'} variant={'transparent'}>
          <PenLine />
        </FloatButton>
        <FloatButton title="플로팅버튼" size={'sm'} variant={'transparent'}>
          <PenLine />
        </FloatButton>
        <FloatButton title="플로팅버튼" variant={'transparent'}>
          <PenLine />
        </FloatButton>
        <FloatButton title="플로팅버튼" size={'lg'} variant={'transparent'}>
          <PenLine />
        </FloatButton>
      </div>

      <h3>Transparent Secondary</h3>
      <div className="mb-6 flex items-center gap-3">
        <FloatButton title="플로팅버튼" size={'min'} variant={'transparent'} color="secondary">
          <PenLine />
        </FloatButton>
        <FloatButton title="플로팅버튼" size={'sm'} variant={'transparent'} color="secondary">
          <PenLine />
        </FloatButton>
        <FloatButton title="플로팅버튼" variant={'transparent'} color="secondary">
          <PenLine />
        </FloatButton>
        <FloatButton title="플로팅버튼" size={'lg'} variant={'transparent'} color="secondary">
          <PenLine />
        </FloatButton>
      </div>
    </div>
  );
};

export default HomePage;
