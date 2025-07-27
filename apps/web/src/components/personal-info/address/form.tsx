'use client';

import { useState } from 'react';
import { InputPersonal } from '@/components/personal-info';
import { Button } from '@/components/ui';
import { Checkbox } from '@/components/ui/checkbox';
import type { CreateAddressRequest } from '@/lib/types/address';
import { useToastStore } from '@/lib/zustand/store/toast-store';

interface AddressFormProps {
  item: AddressFormItem;
  onClick: (data: CreateAddressRequest) => void;
}

interface AddressFormItem {
  name: string;
  address: string;
  detail: string;
  phone: string;
}

const AddressForm = ({ item, onClick }: AddressFormProps) => {
  const { showToast } = useToastStore();

  const [formData, setFormData] = useState<CreateAddressRequest>({
    userName: item.name || '',
    address: item.address || '',
    addressDetail: item.detail || '',
    phone: item.phone || '',
    isPrimary: false,
  });

  const handleInputChange = (field: keyof CreateAddressRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isPrimary: checked }));
  };

  const handleSubmit = () => {
    // 필수 필드 검증
    if (!formData.address) {
      showToast({
        status: 'error',
        title: '입력 오류',
        subtext: '주소를 입력해주세요.',
        autoClose: true,
      });
      return;
    }

    // props로 받은 onClick 함수에 formData 전달
    onClick(formData);
  };

  return (
    <div className="flex h-full w-full flex-col justify-between px-4">
      <div className="flex flex-col gap-4">
        <InputPersonal
          id="userName"
          label="이름"
          placeholder={item.name}
          type="text"
          value={formData.userName || ''}
          onChange={(e) => handleInputChange('userName', e.target.value)}
        />
        <div className="flex flex-col">
          <InputPersonal
            id="address"
            label="주소"
            placeholder={item.address}
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
          />
          <InputPersonal
            id="addressDetail"
            placeholder={item.detail}
            type="text"
            value={formData.addressDetail || ''}
            onChange={(e) => handleInputChange('addressDetail', e.target.value)}
          />
        </div>
        <InputPersonal
          id="phone"
          label="휴대전화"
          placeholder={item.phone}
          type="tel"
          value={formData.phone || ''}
          onChange={(e) => handleInputChange('phone', e.target.value)}
        />
      </div>
      <div className="flex w-full flex-col gap-4 pb-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="isPrimary"
            checked={formData.isPrimary}
            onCheckedChange={handleCheckboxChange}
          />
          <label htmlFor="isPrimary">대표 주소로 설정하기</label>
        </div>
        <Button onClick={handleSubmit} fullWidth>
          제출하기
        </Button>
      </div>
    </div>
  );
};

export default AddressForm;
