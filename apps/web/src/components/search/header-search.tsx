import InputSearch from '@/components/search/input-search';
import { Menu } from 'lucide-react';

const HeaderSearch = () => {
  return (
    <header className="sticky top-0 border-b-2 border-b-neutral-100 bg-white p-4">
      <InputSearch id="search" />
      {/*<button type="button" className="h-9 w-9 cursor-pointer [&>svg]:h-6 [&>svg]:w-6">*/}
      {/*  <Menu />*/}
      {/*</button>*/}
    </header>
  );
};

export default HeaderSearch;
