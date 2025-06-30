'use client';

import { useState } from 'react';

import { SelectBox } from '@/components/common/select-box';
import { CATEGORIES } from '@/lib/constants/tabs';

const stateOptions = CATEGORIES.slice(1);

const CategorySelectBox = ({ className }: { className: string }) => {
  const [selectedState, setSelectedState] = useState(stateOptions[0]?.value);

  return (
    <SelectBox
      options={stateOptions}
      placeholder="상태"
      value={selectedState}
      onValueChange={setSelectedState}
      className={className}
    />
  );
};

export default CategorySelectBox;
