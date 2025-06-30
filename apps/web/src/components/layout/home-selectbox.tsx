import { useState } from 'react';

import { SortOption } from '@/lib/types/auction';

import { SelectBox } from '../common/select-box';

interface HomeSelectBoxProps {
  onSortChange?: (sortOption: SortOption) => void;
}

const HomeSelectBox = ({ onSortChange }: HomeSelectBoxProps) => {
  const [selectedSort, setSelectedSort] = useState<SortOption>('latest');

  const sortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'ending_soon', label: '마감임박순' },
    { value: 'price_low', label: '낮은가격순' },
    { value: 'price_high', label: '높은가격순' },
    { value: 'popular', label: '인기순' },
    { value: 'title_asc', label: '제목순' },
  ];

  const handleSortChange = (value: string) => {
    const sortValue = value as SortOption;
    setSelectedSort(sortValue);

    // 부모 컴포넌트에 정렬 변경 알림
    if (onSortChange) {
      onSortChange(sortValue);
    }
  };

  return (
    <SelectBox
      options={sortOptions}
      placeholder="정렬"
      value={selectedSort}
      onValueChange={handleSortChange}
    />
  );
};

export default HomeSelectBox;
