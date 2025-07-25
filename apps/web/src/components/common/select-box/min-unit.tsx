'use client';

import { useState } from 'react';

import { SelectBox } from '@/components/common';

interface MinUnitSelectBoxProps {
  className?: string;
  name?: string;
  defaultValue?: string;
}

const minUnitOptions = [
  { value: '1000', label: '1,000' },
  { value: '10000', label: '10,000' },
  { value: '50000', label: '50,000' },
  { value: '100000', label: '100,000' },
];

const MinUnitSelectBox = ({ className, name, defaultValue }: MinUnitSelectBoxProps) => {
  const [selectedState, setSelectedState] = useState(
    String(defaultValue ?? minUnitOptions[0]?.value ?? '')
  );

  return (
    <SelectBox
      options={minUnitOptions}
      value={selectedState}
      onValueChange={setSelectedState}
      className={className}
      name={name}
    />
  );
};

export default MinUnitSelectBox;
