import { useState } from 'react';

import { SelectBox } from '../common/select/basic';

interface HomeSelectBoxProps {
  onLocationChange?: (locationId: string | null, locationName: string) => void;
}

const HomeSelectBox = ({ onLocationChange }: HomeSelectBoxProps) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  const locationOptions = [
    { value: 'all', label: '전체' },
    { value: '4630ffa8-c333-43f7-b0b6-8b6226a3e96c', label: '서울 강남구 논현동' },
    { value: '475173a9-eaa3-4913-91f9-73c585aa307f', label: '서울 강남구 반포동' },
    { value: '815fc07e-9099-4ac2-8ca5-8df4e6715567', label: '서울 강남구 역삼동' },
    { value: '817be727-4b8c-40a8-bdc8-7e6c64bd25cf', label: '서울 강남구 양재동' },
  ];

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
    const selectedOption = locationOptions.find((option) => option.value === value);
    const locationId = value === 'all' ? null : value;
    const locationName = selectedOption?.label || '전체';

    // 부모 컴포넌트에 위치 변경 알림
    if (onLocationChange) {
      onLocationChange(locationId, locationName);
    }
  };

  return (
    <SelectBox
      options={locationOptions}
      placeholder="지역"
      value={selectedLocation}
      onValueChange={handleLocationChange}
    />
  );
};

export default HomeSelectBox;
