import { BellRing } from 'lucide-react';

import { HeaderWrapper } from '@/components/layout';
import HomeSelectBox from '@/components/layout/home-selectbox';

const MainHeader = () => {
  return (
    <HeaderWrapper className="bg-white">
      <HomeSelectBox />
      <BellRing />
    </HeaderWrapper>
  );
};

export default MainHeader;
