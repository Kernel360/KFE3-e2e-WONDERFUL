'use client';

import { useState } from 'react';

import { SelectBox } from '@/components/common/select/basic';
import { AuctionFormSelectProps } from '@/lib/types/auction';

const stateOptions = [
  { value: '500', label: '500' },
  { value: '1000', label: '1,000' },
  { value: '5000', label: '5,000' },
  { value: '10000', label: '10,000' },
];

const MinUnitSelectBox = ({ className, name }: AuctionFormSelectProps) => {
  const [selectedState, setSelectedState] = useState(stateOptions[0]?.label);

  return (
    <SelectBox
      options={stateOptions}
      value={selectedState}
      onValueChange={setSelectedState}
      className={className}
      name={name}
    />
  );
};

export default MinUnitSelectBox;
