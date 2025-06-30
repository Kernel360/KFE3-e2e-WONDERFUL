'use client';

import { useState } from 'react';

import { SelectBox } from '@/components/common/select-box';

const stateOptions = [
  { value: '500', label: '500원' },
  { value: '1000', label: '1000원' },
  { value: '5000', label: '5000원' },
  { value: '10000', label: '10,000원' },
];

const MinUnitSelectBox = ({ className }: { className?: string }) => {
  const [selectedState, setSelectedState] = useState(stateOptions[0]?.value);

  return (
    <SelectBox
      options={stateOptions}
      value={selectedState}
      onValueChange={setSelectedState}
      className={className}
    />
  );
};

export default MinUnitSelectBox;
