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
  // 초기값 로직을 명확히 분리
  const getInitialValue = (value?: string) => {
    if (value !== undefined) return value;
    return stateOptions[0]?.value || '';
  };

  const [selectedState, setSelectedState] = useState(getInitialValue(defaultValue));

  // defaultValue의 모든 변경사항을 반영 (빈 문자열 포함)
  useEffect(() => {
    setSelectedState(getInitialValue(defaultValue));
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
