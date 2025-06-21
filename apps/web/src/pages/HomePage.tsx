'use client';

import { BellElectric } from 'lucide-react';

import { Button } from '../components/ui/button';

const HomePage = () => {
  return (
    <div>
      {/* <h1>메인 홈 페이지</h1> */}
      <h3>Solid Primary</h3>
      <div className="mt-2 flex items-center gap-3">
        <Button size={'min'}>
          <BellElectric />
          Button
        </Button>
        <Button size={'sm'}>
          <BellElectric />
          Button
        </Button>
        <Button>
          <BellElectric />
          Button
        </Button>
        <Button size={'lg'}>
          <BellElectric />
          Button
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
