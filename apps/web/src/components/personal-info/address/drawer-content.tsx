'use client';

import { useState } from 'react';

import { AddressItem, ButtonSelect, DrawerHeader } from '@/components/personal-info';
import ButtonManage from '@/components/personal-info/button-manage';
import { Button, DrawerContent } from '@/components/ui';

import { ADDRESS_DRAWER_HEADER } from '@/constants/personal-info';

const AddressDrawerContent = () => {
  const dummyAddress = [
    {
      id: '1',
      name: '김커널',
      address: '서울 강남구 강남대로 364',
      phone: '010-1234-5678',
      isPrimary: true,
    },
    {
      id: '2',
      name: '김커널',
      address: '서울 강남구 강남대로 364',
      phone: '010-1234-5678',
      isPrimary: false,
    },
    {
      id: '3',
      name: '김커널',
      address: '서울 강남구 강남대로 364',
      phone: '010-1234-5678',
      isPrimary: false,
    },
  ];

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedAddressId(id === selectedAddressId ? null : id);
  };

  // TODO: 해당하는 id 에 대하여 메세지 컴포넌트로 공유하는 onClick 함수 넣어주기
  // TODO: manage-button 에 @modal 경로 넣어주기

  return (
    <DrawerContent className="flex flex-col gap-2 p-4">
      <DrawerHeader
        title={ADDRESS_DRAWER_HEADER.title}
        description={ADDRESS_DRAWER_HEADER.description}
      />
      <ul className="flex flex-col gap-2">
        {dummyAddress.map((address) => (
          <li key={address.id}>
            <AddressItem
              color={selectedAddressId === address.id ? 'selected' : 'default'}
              address={address}
            >
              <ButtonSelect
                isSelected={selectedAddressId === address.id}
                onClick={() => handleSelect(address.id)}
              />
            </AddressItem>
          </li>
        ))}
      </ul>
      <ButtonManage url="/address" title="주소 관리" />
      <Button variant="solid" size="lg">
        공유하기
      </Button>
    </DrawerContent>
  );
};

export default AddressDrawerContent;
