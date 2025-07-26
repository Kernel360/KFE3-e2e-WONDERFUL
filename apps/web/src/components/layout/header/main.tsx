import { BellRing } from 'lucide-react';

import { HeaderWrapper, HomeFilterSelect } from '@/components/layout';

const MainHeader = () => {
  return (
    <HeaderWrapper className="bg-white">
      <HomeFilterSelect />
      <BellRing />
    </HeaderWrapper>
  );
};

export default MainHeader;
