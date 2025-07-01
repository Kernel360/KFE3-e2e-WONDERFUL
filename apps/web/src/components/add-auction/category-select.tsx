'use client';

import { useState } from 'react';

import { SelectBox } from '@/components/common/select-box';

import { FALLBACK_CATEGORIES } from '@/lib/constants/tabs';

// const stateOptions = CATEGORIES.slice(1);
const stateOptions = FALLBACK_CATEGORIES.slice(1).map((category) => ({
  value: category.id,
  label: category.name,
}));

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
