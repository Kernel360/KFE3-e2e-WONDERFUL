import HomeSelectBox from '@/components/layout/home-selectbox';
import HeaderWrapper from '@/components/layout/header/wrapper';
import { BellRing } from 'lucide-react';

const MainHeader = () => {
  return (
    <HeaderWrapper className="bg-white">
      <HomeSelectBox />
      <BellRing />
    </HeaderWrapper>
  );
};

export default MainHeader;
