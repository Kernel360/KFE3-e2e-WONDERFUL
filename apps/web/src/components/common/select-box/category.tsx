'use client';

import { useEffect, useState } from 'react';

import { SelectBox } from '@/components/common';

import { FALLBACK_CATEGORIES } from '@/lib/constants/tabs';

interface CategorySelectBoxProps {
  className?: string;
  name?: string;
  defaultValue?: string;
}
// const stateOptions = FALLBACK_CATEGORIES.slice(1);
const stateOptions = FALLBACK_CATEGORIES.slice(1).map((category) => ({
  value: category.id,
  label: category.name,
}));

const CategorySelectBox = ({ className, name, defaultValue }: CategorySelectBoxProps) => {
  const [selectedState, setSelectedState] = useState(defaultValue || stateOptions[0]?.value || '');

  // defaultValue가 변경될 때마다 선택 상태를 업데이트
  useEffect(() => {
    if (defaultValue) {
      setSelectedState(defaultValue);
    }
  }, [defaultValue]);

  return (
    <SelectBox
      options={stateOptions}
      placeholder="카테고리를 선택해주세요"
      value={selectedState}
      onValueChange={setSelectedState}
      className={className}
      name={name}
    />
  );
};

export default CategorySelectBox;
