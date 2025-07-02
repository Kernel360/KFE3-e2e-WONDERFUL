'use client';

import { useState } from 'react';

import { SelectBox } from '@/components/common/select-box';
import { AuctionFormSelectProps } from '../../lib/types/auction';

const stateOptions = [
  { id: '500', name: '500' },
  { id: '1000', name: '1000' },
  { id: '5000', name: '5000' },
  { id: '10000', name: '10,000' },
];

const MinUnitSelectBox = ({ className, name }: AuctionFormSelectProps) => {
  const [selectedState, setSelectedState] = useState(stateOptions[0]?.name);

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
