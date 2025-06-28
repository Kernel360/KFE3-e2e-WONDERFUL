import InputSearch from '@/components/search/input-search';
import { Menu } from 'lucide-react';

const HeaderSearch = () => {
  return (
    <header className="flex w-full items-center justify-between gap-4">
      <InputSearch id="search" />
      <button type="button" className="h-9 w-9 cursor-pointer [&>svg]:h-6 [&>svg]:w-6">
        <Menu />
      </button>
    </header>
  );
};

export default HeaderSearch;
