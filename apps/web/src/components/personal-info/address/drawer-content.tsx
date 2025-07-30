'use client';

import { useState } from 'react';

import { AddressItem, ButtonManage, ButtonSelect, DrawerHeader } from '@/components/personal-info';
import { Button, DrawerContent } from '@/components/ui';

import { useToastStore } from '@/lib/zustand/store';

import { AddressListItem } from '@/types/address';

import { ADDRESS_DRAWER_HEADER } from '@/constants/personal-info';

const AddressDrawerContent = () => {
  const [addressList, setAddressList] = useState<AddressListItem[]>([]);
  const { showToast } = useToastStore();

  const handleClick = () => {
    showToast({
      status: 'notice',
      title: '준비중인 기능',
      subtext: '주소 공유 기능은 현재 준비중입니다.',
      autoClose: true,
    });
  };

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedAddressId(id === selectedAddressId ? null : id);
  };

  return (
    <DrawerContent className="flex flex-col gap-2 p-4">
      <DrawerHeader
        title={ADDRESS_DRAWER_HEADER.title}
        description={ADDRESS_DRAWER_HEADER.description}
      />
      <ul className="flex flex-col gap-2">
        {addressList.length === 0 && (
          <p className="py-10 text-center text-neutral-600">등록된 주소가 없습니다.</p>
        )}
        {addressList.map((address) => (
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
      <Button variant="solid" size="lg" onClick={handleClick}>
        공유하기
      </Button>
    </DrawerContent>
  );
};

export default AddressDrawerContent;
