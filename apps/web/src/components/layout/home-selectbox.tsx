import { useState } from 'react';

import { SelectBox } from '../common/select-box';

const HomeSelectBox = () => {
  const [selectedState, setSelectedState] = useState('all');
  const stateOptions = [
    { value: 'all', label: '전체' },
    { value: 'active', label: '진행중' },
    { value: 'completed', label: '완료' },
    { value: 'pending', label: '대기' },
  ];
  return (
    <SelectBox
      options={stateOptions}
      placeholder="상태"
      value={selectedState}
      onValueChange={setSelectedState}
    />
  );
};

export default HomeSelectBox;
