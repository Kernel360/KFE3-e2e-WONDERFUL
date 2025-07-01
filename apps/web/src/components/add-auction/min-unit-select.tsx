'use client';

import { useState } from 'react';

import { SelectBox } from '@/components/common/select-box';

const stateOptions = [
  { id: '500', name: '500원' },
  { id: '1000', name: '1000원' },
  { id: '5000', name: '5000원' },
  { id: '10000', name: '10,000원' },
];

const MinUnitSelectBox = ({ className }: { className?: string }) => {
  const [selectedState, setSelectedState] = useState(stateOptions[0]?.id);

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
